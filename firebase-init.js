// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Configuration Firebase CORRECTE
const firebaseConfig = {
  apiKey: "AIzaSyBjbhT9EE0DkabbyQYFn17fTHFuGFF9bZY",
  authDomain: "affinix-3a930.firebaseapp.com",
  databaseURL: "https://affinix-3a930-default-rtdb.firebaseio.com",
  projectId: "affinix-3a930",
  storageBucket: "affinix-3a930.appspot.com",
  messagingSenderId: "498829285833",
  appId: "1:498829285833:web:344dacf5b6bcc818167018"
};

// Initialisation
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  ref,
  set,
  get,
  update
};
