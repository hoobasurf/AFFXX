import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjbhT9EE0DkabbyQYFn17fTHFuGFF9bZY",
  authDomain: "affinix-3a930.firebaseapp.com",
  projectId: "affinix-3a930",
  storageBucket: "affinix-3a930.appspot.com",
  messagingSenderId: "498829285833",
  appId: "1:498829285833:web:xxx"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  const path = window.location.pathname;

  if (!user) {
    // Pas connecté -> redirige sauf si on est déjà sur connexion ou inscription
    if (path !== "/connexion.html" && path !== "/inscription.html") {
      window.location.href = "connexion.html";
    }
  } else {
    // Connecté -> pas autorisé à rester sur connexion ou inscription
    if (path === "/connexion.html" || path === "/inscription.html") {
      window.location.href = "index.html";
    }
  }
});
