const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Transporteur sécurisé avec variables d’environnement
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.pass
  }
});

// Fonction déclenchée après ajout ou changement de selfie
exports.onSelfieUpload = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (after.selfieURL && after.verifie === false && before.selfieURL !== after.selfieURL) {
      const userId = context.params.userId;

      const validateUrl = `https://verifyselfie-fcsg5vix6q-uc.a.run.app?action=validate&userId=${userId}`;
      const refuseUrl = `https://verifyselfie-fcsg5vix6q-uc.a.run.app?action=refuse&userId=${userId}`;

      const mailOptions = {
        from: '"Affinix" <' + functions.config().gmail.user + '>',
        to: functions.config().gmail.user,
        subject: `Demande de vérification selfie - Utilisateur ${userId}`,
        html: `
          <p>Un utilisateur a envoyé un selfie :</p>
          <img src="${after.selfieURL}" style="max-width: 300px;" /><br><br>
          <a href="${validateUrl}" style="padding:10px;background:green;color:white;text-decoration:none;margin-right:10px;">Valider</a>
          <a href="${refuseUrl}" style="padding:10px;background:red;color:white;text-decoration:none;">Refuser</a>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log("Email envoyé pour vérification selfie.");
    }

    return null;
  });

// Fonction HTTP pour gérer clics sur liens (valider/refuser)
exports.verifySelfie = functions.https.onRequest(async (req, res) => {
  const { action, userId } = req.query;

  if (!action || !userId) return res.status(400).send("Paramètres manquants");

  const userRef = admin.firestore().collection("users").doc(userId);
  const userDoc = await userRef.get();
  if (!userDoc.exists) return res.status(404).send("Utilisateur introuvable");

  const data = userDoc.data();

  if (action === "validate") {
    await userRef.update({ verifie: true, tentativeVerif: 0 });
    await transporter.sendMail({
      from: '"Affinix" <' + functions.config().gmail.user + '>',
      to: data.email,
      subject: "Vérification acceptée",
      html: `<p>Bonjour,</p><p>Ta photo selfie a été validée. Bienvenue dans l'univers Affinix !</p>`
    });
    return res.send("Selfie validé !");
  } else if (action === "refuse") {
    const tentatives = (data.tentativeVerif || 0) + 1;
    const updates = { tentativeVerif: tentatives };
    let message = "Photo non validée, merci de renvoyer une photo conforme.";

    if (tentatives >= 3) {
      updates.bloque = true;
      message = "Tu as été bloqué après 3 tentatives non valides.";
    }

    await userRef.update(updates);
    await transporter.sendMail({
      from: '"Affinix" <' + functions.config().gmail.user + '>',
      to: data.email,
      subject: "Vérification selfie refusée",
      html: `<p>Bonjour,</p><p>${message}</p>`
    });
    return res.send("Selfie refusé.");
  }

  return res.status(400).send("Action inconnue.");
});
