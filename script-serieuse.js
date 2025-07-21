document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("profils-container");

  fetch("profils.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(profil => {
        const card = document.createElement("div");
        card.className = "profil-card";

        const anneau = document.createElement("div");
        anneau.className = "anneau";
        anneau.style.setProperty("--couleur", profil.genre === "fille" ? "#ff69b4" : "#33baff");
        anneau.style.setProperty("--progression", profil.joursConnecte * 14.28); // 14.28% par jour

        anneau.style.setProperty("--photo", `url('${profil.photo}')`);
        anneau.style.backgroundImage = `conic-gradient(${anneau.style.getPropertyValue("--couleur")} ${profil.joursConnecte * 14.28}%, transparent 0%)`;
        anneau.style.setProperty("--photo", `url('${profil.photo}')`);
        anneau.querySelector = "div";
        anneau.style.setProperty("--progression", profil.joursConnecte * 14.28);

        anneau.style.setProperty("--progression", profil.joursConnecte);

        anneau.style.setProperty("--photo", `url(${profil.photo})`);
        anneau.style.setProperty("--progression", profil.joursConnecte);

        anneau.style.background = `conic-gradient(${anneau.style.getPropertyValue("--couleur")} ${profil.joursConnecte * 14.28}%, transparent 0%)`;
        anneau.style.position = "relative";
        anneau.innerHTML = `<div style="position:absolute;top:6px;left:6px;right:6px;bottom:6px;border-radius:50%;background-image:url('${profil.photo}');background-size:cover;"></div>`;

        const nom = document.createElement("div");
        nom.className = "profil-nom";
        nom.textContent = profil.nom;

        const bouton = document.createElement("a");
        bouton.className = "profil-btn";
        bouton.href = `profil.html?id=${profil.id}`;
        bouton.textContent = "Voir le profil";

        card.appendChild(anneau);
        card.appendChild(nom);
        card.appendChild(bouton);

        container.appendChild(card);
      });
    });
});
