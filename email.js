(function(){
  emailjs.init("brice.paneela@icloud.com"); // Remplace par ton User ID EmailJS
})();

document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const serviceID = 'default_service';
  const templateID = 'template_affinix'; // Remplace par ton Template ID

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      document.getElementById("status-message").textContent = "🎉 Email envoyé ! Vérifie ta boîte.";
      window.location.href = "confirmation.html";
    }, (err) => {
      document.getElementById("status-message").textContent = "Erreur lors de l’envoi.";
      console.log(err);
    });
});
