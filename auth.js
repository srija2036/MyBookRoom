import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const authBtn = document.getElementById('authBtn');
const toggleAuth = document.getElementById('toggleAuth');
const forgotPassword = document.getElementById('forgotPassword');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

let isLoggingIn = true;

// --- 1. Eye Toggle Functionality ---
togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    togglePassword.textContent = isPassword ? '🙈' : '👁️';
});

// --- 2. Switch between Login and Signup ---
toggleAuth.onclick = () => {
    isLoggingIn = !isLoggingIn;
    document.getElementById('authTitle').innerText = isLoggingIn ? "Welcome Back" : "Create Account";
    document.getElementById('authSubtitle').innerText = isLoggingIn ? "Please enter your credentials." : "Join our community of readers.";
    authBtn.innerText = isLoggingIn ? "Login" : "Sign Up";
    toggleAuth.innerText = isLoggingIn ? "Create Account" : "Already have an account? Login";
    forgotPassword.style.display = isLoggingIn ? "block" : "none";
};

// --- 3. Forgot Password Functionality ---
forgotPassword.onclick = async () => {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Please enter your email address first to receive a reset link.");
        return;
    }
    try {
        await sendPasswordResetEmail(auth, email);
        alert("A posh reset link has been sent to your email. Please check your inbox.");
    } catch (error) {
        alert("Error: " + error.message);
    }
};

// --- 4. Main Authentication (Login/Signup) ---
authBtn.onclick = async () => {
    const email = document.getElementById('email').value;
    const password = passwordInput.value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        if (isLoggingIn) {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        // Success redirect
        window.location.href = "room.html";
    } catch (error) {
        // Friendly error messages
        let msg = error.code;
        if (msg === 'auth/invalid-credential') msg = "Incorrect email or password.";
        if (msg === 'auth/email-already-in-use') msg = "This email is already registered.";
        if (msg === 'auth/weak-password') msg = "Password should be at least 6 characters.";
        alert(msg);
    }
};

// --- 5. Session Check ---
onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.includes('login.html')) {
        window.location.href = "room.html";
    }
});