// // Import Firebase SDK
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"; 

// // Your Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAVxK1_lGtAaVH2WAEf7It9TLJKvV16EnU",
//     authDomain: "event-hub-68c11.firebaseapp.com",
//     databaseURL: "https://event-hub-68c11-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "event-hub-68c11",
//     storageBucket: "event-hub-68c11.appspot.com",
//     messagingSenderId: "899463910584",
//     appId: "1:899463910584:web:a80839e92cfd589e67904d",
//     measurementId: "G-3PW2XTLSHY"
// };
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; 

const firebaseConfig = {
    apiKey: "AIzaSyANWJFpmZK0AAK6j3-wRjKD_7ShHWtON4k",
    authDomain: "event-hub-e7f6c.firebaseapp.com",
    projectId: "event-hub-e7f6c",
    storageBucket: "event-hub-e7f6c.appspot.com",
    messagingSenderId: "380985028611",
    appId: "1:380985028611:web:74718b5a32a841c4ec5e36",
    measurementId: "G-XCKT9FBD4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth


// Password visibility toggle
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function() {
    // Toggle the password field type
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
    // Toggle the eye icon
    this.classList.toggle('bx-hide');
    this.classList.toggle('bx-show');
});


// Handle Login Form Submission
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form from refreshing

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            console.log(userCredential.user);
            // Redirect to home
            window.location.href = "/mainn/frontend/Organizer-home/organizer-home.html"; 
        })
        .catch((error) => {
            alert(error.message);
            console.error(error);
        });
});
