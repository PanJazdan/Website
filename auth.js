import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDvOvJp7PelvPEWxw_YrgtX_jZiPgzJGAk",
    authDomain: "website-8989b.firebaseapp.com",
    projectId: "website-8989b",
    storageBucket: "website-8989b.firebasestorage.app",
    messagingSenderId: "275979359088",
    appId: "1:275979359088:web:d8f124c9475fba21e9b5b5"
};

// Inicjalizacja Firebase raz
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Funkcja pomocnicza do komunikatów
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (!messageDiv) return;
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => { messageDiv.style.opacity = 0; }, 5000);
}

// Czekamy na załadowanie DOM (na wypadek skryptu w head)
document.addEventListener('DOMContentLoaded', () => {
    const signUpBtn = document.getElementById("btnSignup");
    const loginBtn = document.getElementById("btnLogin");

    // REJESTRACJA
    signUpBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = { email: email };
                
                return setDoc(doc(db, "users", user.uid), userData);
            })
            .then(() => {
                showMessage("Konto utworzone!", "signMess");
                // window.location.href = "index.html"; // opcjonalnie
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    showMessage('Email już istnieje', 'signMess');
                } else {
                    showMessage('Błąd rejestracji', 'signMess');
                    console.error(error);
                }
            });
    });

    // LOGOWANIE
    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Zalogowano pomyślnie!");
            })
            .catch((error) => {
                showMessage("Błędny email lub hasło", "signMess");
            });
    });
});