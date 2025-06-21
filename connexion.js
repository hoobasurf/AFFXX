import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from './firebase-init.js';

const formTitle = document.getElementById('form-title');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const toggleLink = document.getElementById('toggle-mode');
const errorMessage = document.getElementById('error-message');

let isLogin = true; // true = connexion, false = inscription

// Mapping simple des erreurs Firebase en français
const errorMap = {
  'auth/invalid-email': "Email invalide.",
  'auth/user-disabled': "Utilisateur désactivé.",
  'auth/user-not-found': "Utilisateur non trouvé.",
  'auth/wrong-password': "Mot de passe incorrect.",
  'auth/email-already-in-use': "Email déjà utilisé.",
  'auth/weak-password': "Mot de passe trop faible (min 6 caractères)."
};

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

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    errorMessage.textContent = "Veuillez remplir tous les champs.";
    return;
  }

  errorMessage.textContent = "";
  submitBtn.disabled = true;

  if (isLogin) {
    // Connexion
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = 'profil.html';
      })
      .catch(error => {
        errorMessage.textContent = errorMap[error.code] || error.message;
        submitBtn.disabled = false;
      });
  } else {
    // Inscription
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = 'profil.html';
      })
      .catch(error => {
        errorMessage.textContent = errorMap[error.code] || error.message;
        submitBtn.disabled = false;
      });
  }
});

// Redirection si déjà connecté
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = 'profil.html';
  }
});
