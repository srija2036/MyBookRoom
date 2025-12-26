import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const authBtn = document.getElementById('authBtn');
const toggleAuth = document.getElementById('toggleAuth');
let isLoggingIn = true;

toggleAuth.onclick = () => {
    isLoggingIn = !isLoggingIn;
    document.getElementById('authTitle').innerText = isLoggingIn ? "Welcome Back" : "Create Account";
    authBtn.innerText = isLoggingIn ? "Login" : "Sign Up";
    toggleAuth.innerText = isLoggingIn ? "Don't have an account? Sign Up" : "Already have an account? Login";
};

authBtn.onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        if (isLoggingIn) {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        window.location.href = "room.html"; // Redirect after success
    } catch (error) {
        alert(error.message);
    }
};

// Check if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.includes('login.html')) {
        window.location.href = "room.html";
    }
});