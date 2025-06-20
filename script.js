document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const prenom = form.querySelector('input[name="prenom"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const salles = [...form.querySelectorAll('input[name="salles[]"]:checked')];

    let errors = [];

    if (prenom.length < 2) errors.push("Le prénom est trop court.");
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push("Email invalide.");
    if (salles.length === 0) errors.push("Veuillez choisir au moins une salle.");

    if (errors.length > 0) {
      e.preventDefault();
      alert(errors.join("\n"));
    } else {
      // ✅ Corrige la redirection Netlify pour éviter l'écran blanc
      setTimeout(() => {
        window.location.href = "/salle.html";
      }, 100);
    }
  });
});
