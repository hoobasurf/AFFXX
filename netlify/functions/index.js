const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

app.use(express.json());

// Transporteur SMTP sécurisé (mot de passe d’application)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'brice.paneela@icloud.com',
    pass: 'pmah-mhzn-ktwz-vwhp'
  }
});

// Route GET (test simple pour voir si la fonction fonctionne)
app.get('/', async (req, res) => {
  try {
    await transporter.sendMail({
      from: 'brice.paneela@icloud.com',
      to: 'brice.paneela@icloud.com',
      subject: 'Test réussi depuis Affinix',
      text: 'La fonction Firebase a bien été déployée !'
    });
    res.status(200).send('✅ Email envoyé avec succès !');
  } catch (error) {
    console.error('Erreur d’envoi :', error);
    res.status(500).send('❌ Échec de l’envoi d’email');
  }
});

// Export Cloud Function (⚠️ sans .region() car tu es en 1st Gen)
exports.verifySelfie = functions.https.onRequest(app);
