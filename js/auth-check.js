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
  if (!user) {
    // Utilisateur non connecté -> redirection vers login.html
    if(window.location.pathname !== "/login.html" && window.location.pathname !== "/signup.html") {
      window.location.href = "login.html";
    }
  } else {
    // Utilisateur connecté -> si sur login ou signup, le renvoyer vers la page principale
    if(window.location.pathname === "/login.html" || window.location.pathname === "/signup.html") {
      window.location.href = "index.html"; // ou ta page principale
    }
  }
});
