const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure ton SMTP ici (exemple Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ton.email@gmail.com",
    pass: "ton-mot-de-passe-app" // mot de passe app Google
  }
});

// Fonction déclenchée à chaque update du doc utilisateur
exports.onSelfieUpload = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (after.selfieURL && after.verifie === false && before.selfieURL !== after.selfieURL) {
      const userId = context.params.userId;
      const baseUrl = "https://ton-site-ou-fonction.cloudfunctions.net"; // à adapter

      const validateUrl = `${baseUrl}/verifySelfie?action=validate&userId=${userId}`;
      const refuseUrl = `${baseUrl}/verifySelfie?action=refuse&userId=${userId}`;

      const mailOptions = {
        from: '"Affinix" <ton.email@gmail.com>',
        to: "ton.email@gmail.com", // ton email de créateur
        subject: `Nouvelle demande de vérification selfie - utilisateur ${userId}`,
        html: `
          <p>Un nouvel utilisateur a envoyé un selfie pour vérification :</p>
          <img src="${after.selfieURL}" style="max-width: 300px;"/><br/><br/>
          <a href="${validateUrl}" style="padding:10px 15px; background:green; color:white; text-decoration:none; margin-right:10px;">Valider</a>
          <a href="${refuseUrl}" style="padding:10px 15px; background:red; color:white; text-decoration:none;">Refuser</a>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log("Email envoyé au créateur pour validation selfie utilisateur", userId);
    }

    return null;
  });

// Fonction HTTP pour gérer clics sur validation/refus
exports.verifySelfie = functions.https.onRequest(async (req, res) => {
  const { action, userId } = req.query;

  if (!action || !userId) {
    return res.status(400).send("Paramètres manquants");
  }

  const userRef = admin.firestore().collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return res.status(404).send("Utilisateur non trouvé");
  }

  const userData = userDoc.data();

  if (action === "validate") {
    await userRef.update({
      verifie: true,
      tentativeVerif: 0
    });

    await transporter.sendMail({
      from: '"Affinix" <ton.email@gmail.com>',
      to: userData.email,
      subject: "Bienvenue sur Affinix - Vérification validée",
      html: `<p>Bonjour,</p><p>Ta photo selfie a été validée. Bienvenue dans l'univers Affinix !</p>`
    });

    return res.send("Selfie validé. Email envoyé à l'utilisateur.");

  } else if (action === "refuse") {
    let newTentative = (userData.tentativeVerif || 0) + 1;
    let updateData = { tentativeVerif: newTentative };
    let message = "Photo non validée, merci de renvoyer une photo conforme à la charte.";

    if (newTentative >= 3) {
      updateData.bloque = true;
      message = "L'utilisateur a été bloqué après 3 tentatives non valides.";
    }

    await userRef.update(updateData);

    await transporter.sendMail({
      from: '"Affinix" <ton.email@gmail.com>',
      to: userData.email,
      subject: "Photo selfie non validée - Affinix",
      html: `<p>Bonjour,</p><p>${message}</p>`
    });

    return res.send("Selfie refusé. Email envoyé à l'utilisateur.");
  }

  return res.status(400).send("Action inconnue");
});
