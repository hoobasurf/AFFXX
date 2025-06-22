const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configurer ton transporteur SMTP avec ton email et mot de passe d'application
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'brice.paneela@icloud.com', // ton email
    pass: 'pmah-mhzn-ktwz-vwhp'       // ton mot de passe application
  }
});

// Exemple simple d’une fonction Cloud Function
exports.verifySelfie = functions.https.onRequest(async (req, res) => {
  try {
    // Exemple : envoie d’un mail ou traitement
    const mailOptions = {
      from: 'brice.paneela@icloud.com',
      to: 'destinataire@example.com',
      subject: 'Test Firebase Function',
      text: 'Hello from Firebase!'
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});
