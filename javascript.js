// === Navigation fluide avec fade out ===
document.querySelectorAll('.panel, .enter-button').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const href = btn.getAttribute('data-href') || btn.getAttribute('href') || btn.getAttribute('onclick')?.replace("window.location.href='", "").replace("'", "");
    if (!href) return;
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = href;
    }, 400);
  });
});

// === Formulaire d'inscription ===
const form = document.getElementById('inscriptionForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupération des données
    const pseudo     = document.getElementById('pseudo').value;
    const description = document.getElementById('description').value;
    const photo      = document.getElementById('photo').files[0];
    const lieu       = document.getElementById('lieu').value;
    const recherche  = document.getElementById('recherche').value;
    const distance   = document.getElementById('distance').value;

    // Stockage local temporaire
    localStorage.setItem('user', JSON.stringify({
      pseudo,
      description,
      lieu,
      recherche,
      distance,
      photoName: photo ? photo.name : ""
    }));

    // Redirection ou message
    alert("Merci ! Ton profil sera visible une fois ta photo vérifiée.");
    window.location.href = 'merci.html';
  });
}
