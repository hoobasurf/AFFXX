(function(){
  emailjs.init("nKWP2R-xO7xNVFXOp"); // Remplace par ton User ID EmailJS
})();

document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const serviceID = 'service_q91e0wb';
  const templateID = 'template_pf6049c'; // Remplace par ton Template ID

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      document.getElementById("status-message").textContent = "🎉 Email envoyé ! Vérifie ta boîte.";
      setTimeout(() => {
        window.location.href = "panneaux.html";  // redirection vers la page des panneaux
      }, 2000);  // délai 2s avant redirection
    }, (err) => {
      document.getElementById("status-message").textContent = "Erreur lors de l’envoi.";
      console.log(err);
    });
});
