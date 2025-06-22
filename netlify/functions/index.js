const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Transporteur sécurisé via variables d'environnement
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.pass
  }
});

// Cloud Function qui envoie un email
exports.verifySelfie = functions.https.onRequest(async (req, res) => {
  try {
    const mailOptions = {
      from: functions.config().gmail.user,
      to: 'destinataire@example.com', // remplace par ton vrai destinataire
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
