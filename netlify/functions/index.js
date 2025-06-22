const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const transporter = nodemailer.createTransport({
  service: "icloud",
  auth: {
    user: "brice.paneela@icloud.com",
    pass: "pmah-mhzn-ktwz-vwhp", // mot de passe app iCloud
  },
});

exports.sendVerificationEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { email, selfieUrl } = req.body;

    const mailOptions = {
      from: "brice.paneela@icloud.com",
      to: "brice.paneela@icloud.com",
      subject: "Nouvelle vérification de profil AFFINIX ✨",
      html: `
        <h2>Nouvelle demande de vérification</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Selfie envoyé :</strong></p>
        <img src="${selfieUrl}" alt="Selfie" style="max-width:100%; height:auto;"/>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi du mail :", error);
        res.status(500).send("Erreur d'envoi");
      } else {
        console.log("Email envoyé :", info.response);
        res.status(200).send("Email envoyé !");
      }
    });
  });
});
