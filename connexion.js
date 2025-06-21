import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from './firebase-init.js';

const formTitle = document.getElementById('form-title');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const toggleLink = document.getElementById('toggle-mode');
const errorMessage = document.getElementById('error-message');

let isLogin = true; // true = connexion, false = inscription

toggleLink.addEventListener('click', () => {
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = "Connexion";
    submitBtn.textContent = "Se connecter";
    toggleLink.textContent = "Pas encore inscrit ? Crée un compte";
  } else {
    formTitle.textContent = "Inscription";
    submitBtn.textContent = "S'inscrire";
    toggleLink.textContent = "Déjà un compte ? Connecte-toi";
  }
  errorMessage.textContent = "";
});

submitBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    errorMessage.textContent = "Veuillez remplir tous les champs.";
    return;
  }

  errorMessage.textContent = "";

  if (isLogin) {
    // Connexion
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Connecté avec succès
        window.location.href = 'profil.html'; // redirige vers profil
      })
      .catch(error => {
        errorMessage.textContent = error.message;
      });
  } else {
    // Inscription
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Utilisateur créé, redirige vers profil
        window.location.href = 'profil.html';
      })
      .catch(error => {
        errorMessage.textContent = error.message;
      });
  }
});

// Si déjà connecté, rediriger direct vers profil
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = 'profil.html';
  }
});
