// netlify/functions/verifySelfie.js
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  const { action, userId } = event.queryStringParameters || {};

  if (!action || !userId) {
    return {
      statusCode: 400,
      body: "Paramètres manquants"
    };
  }

  // Config SMTP depuis variables d’environnement Netlify
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

  // Simule récupération user (à adapter pour Firestore via REST API si besoin)
  // Ici tu devrais faire un fetch vers Firestore REST pour récupérer userData

  if (action === "validate") {
    // Envoie un email de validation (exemple simplifié)
    await transporter.sendMail({
      from: `"Affinix" <${process.env.SMTP_USER}>`,
      to: "utilisateur@example.com",
      subject: "Vérification validée",
      html: `<p>Ta photo selfie a été validée. Bienvenue !</p>`
    });
    return {
      statusCode: 200,
      body: "Selfie validé"
    };
  } else if (action === "refuse") {
    // Envoie un email de refus
    await transporter.sendMail({
      from: `"Affinix" <${process.env.SMTP_USER}>`,
      to: "utilisateur@example.com",
      subject: "Photo non validée",
      html: `<p>Merci de renvoyer une photo conforme.</p>`
    });
    return {
      statusCode: 200,
      body: "Selfie refusé"
    };
  }

  return {
    statusCode: 400,
    body: "Action inconnue"
  };
};
