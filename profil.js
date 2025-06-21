import { auth, db, onAuthStateChanged, ref, get, set, update, signOut } from './firebase-init.js';

const emailSpan = document.getElementById('user-email');
const relationInput = document.getElementById('relation-type');
const descriptionInput = document.getElementById('description');
const saveBtn = document.getElementById('save-profile');
const logoutBtn = document.getElementById('logout');

let currentUser = null;

onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    emailSpan.textContent = user.email;
    loadProfile(user.uid);
  } else {
    // Rediriger vers la page connexion si pas connecté
    window.location.href = "connexion.html";
  }
});

function loadProfile(uid) {
  const userRef = ref(db, 'users/' + uid);
  get(userRef).then(snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      relationInput.value = data.relationType || '';
      descriptionInput.value = data.description || '';
    } else {
      // Pas de profil encore, laisse vide
    }
  });
}

saveBtn.addEventListener('click', () => {
  if (!currentUser) return alert("Utilisateur non connecté.");
  
  const userRef = ref(db, 'users/' + currentUser.uid);
  set(userRef, {
    email: currentUser.email,
    relationType: relationInput.value,
    description: descriptionInput.value
  }).then(() => {
    alert("Profil sauvegardé !");
  }).catch(err => {
    alert("Erreur lors de la sauvegarde : " + err.message);
  });
});

logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "connexion.html";
  });
});
