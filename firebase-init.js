import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  update 
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBjbhT9EE0DkabbyQYFn17fTHFuGFF9bZY",
  authDomain: "affinix-3a930.firebaseapp.com",
  databaseURL: "https://affinix-3a930-default-rtdb.firebaseio.com",
  projectId: "affinix-3a930",
  storageBucket: "affinix-3a930.appspot.com",  // Correction ici
  messagingSenderId: "498829285833",
  appId: "1:498829285833:web:344dacf5b6bcc818167018"
};

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
