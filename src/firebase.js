import { initializeApp } from "firebase/app";
import { getAuth, signOut, GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDv0WHqXaYUnih1NoFGZVCvpSmzqG4fTN8",
  authDomain: "hot-burgers-c8b54.firebaseapp.com",
  databaseURL: "https://hot-burgers-c8b54-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { 
  app,
  auth,
  database,
  ref,
  onValue,
  set,
  off,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
};
