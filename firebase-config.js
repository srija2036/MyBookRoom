import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

 const firebaseConfig = {
    apiKey: "AIzaSyCvuo23eLJLLOKnHCCTT270F3xPWVc-r4o",
    authDomain: "mybookroom-a0ba7.firebaseapp.com",
    projectId: "mybookroom-a0ba7",
    storageBucket: "mybookroom-a0ba7.firebasestorage.app",
    messagingSenderId: "217478922812",
    appId: "1:217478922812:web:61b6d30bcdec863783b939"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);