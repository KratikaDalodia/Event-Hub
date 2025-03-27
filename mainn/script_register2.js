// importing fireb sdk
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// fireb configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; 

const firebaseConfig = {
    apiKey: "AIzaSyANWJFpmZK0AAK6j3-wRjKD_7ShHWtON4k",
    authDomain: "event-hub-e7f6c.firebaseapp.com",
    projectId: "event-hub-e7f6c",
    storageBucket: "event-hub-e7f6c.appspot.com",
    messagingSenderId: "380985028611",
    appId: "1:380985028611:web:74718b5a32a841c4ec5e36",
    measurementId: "G-XCKT9FBD4F"
};

// fireb initialition
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// form submission
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form refreshing

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // user create
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Registration Successful!");
            console.log(userCredential.user);

            window.location.href = "frontend/index.html";  
        })
        .catch((error) => {
            alert(error.message);
            console.error(error);
        });
});
