const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const db = admin.firestore();

// 🔒 Config Email sécurisé via variables d’environnement
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.pass
  }
});

// Déclencheur : quand un utilisateur met à jour son profil avec un selfie
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
        to: functions.config().gmail.user, // ton adresse
        subject: `🎯 Vérification selfie - utilisateur ${userId}`,
        html: `
          <p>📸 Un utilisateur a envoyé un selfie :</p>
          <img src="${after.selfieURL}" style="max-width: 300px; border-radius: 10px;"/><br/><br/>
          <a href="${validateUrl}" style="padding:12px 18px;background:green;color:white;text-decoration:none;border-radius:5px;margin-right:10px;">✅ Valider</a>
          <a href="${refuseUrl}" style="padding:12px 18px;background:red;color:white;text-decoration:none;border-radius:5px;">❌ Refuser</a>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log("Email envoyé au créateur pour validation selfie utilisateur", userId);
    }

    return null;
  });

// Fonction HTTP (cliquer sur les liens dans l’email)
exports.verifySelfie = functions.https.onRequest(async (req, res) => {
  const { action, userId } = req.query;

  if (!action || !userId) {
    return res.status(400).send("Paramètres manquants");
  }

  const userRef = db.collection("users").doc(userId);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    return res.status(404).send("Utilisateur introuvable");
  }

  const userData = userSnap.data();

  if (action === "validate") {
    await userRef.update({
      verifie: true,
      tentativeVerif: 0
    });

    await transporter.sendMail({
      from: '"Affinix" <' + functions.config().gmail.user + '>',
      to: userData.email,
      subject: "✅ Vérification acceptée - Affinix",
      html: `<p>🎉 Bonjour ${userData.prenom || ""},<br/>Ta photo selfie a été validée ! Bienvenue dans l'univers Affinix ✨</p>`
    });

    return res.send("✅ Selfie validé. Email envoyé à l'utilisateur.");

  } else if (action === "refuse") {
    const newTentative = (userData.tentativeVerif || 0) + 1;
    const updateData = { tentativeVerif: newTentative };
    let message = "❌ Photo non validée. Merci d'envoyer un selfie correspondant à ton profil.";

    if (newTentative >= 3) {
      updateData.bloque = true;
      message = "🚫 Tu as été bloqué après 3 tentatives non valides.";
    }

    await userRef.update(updateData);

    await transporter.sendMail({
      from: '"Affinix" <' + functions.config().gmail.user + '>',
      to: userData.email,
      subject: "❌ Vérification échouée - Affinix",
      html: `<p>${message}</p>`
    });

    return res.send("❌ Selfie refusé. Email envoyé à l'utilisateur.");
  }

  return res.status(400).send("Action inconnue");
});
