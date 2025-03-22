// importing fireb sdk
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// fireb configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVxK1_lGtAaVH2WAEf7It9TLJKvV16EnU",
    authDomain: "event-hub-68c11.firebaseapp.com",
    databaseURL: "https://event-hub-68c11-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "event-hub-68c11",
    storageBucket: "event-hub-68c11.appspot.com",
    messagingSenderId: "899463910584",
    appId: "1:899463910584:web:a80839e92cfd589e67904d",
    measurementId: "G-3PW2XTLSHY"
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

            window.location.href = "frontend/organiser/org_home.html";  
        })
        .catch((error) => {
            alert(error.message);
            console.error(error);
        });
});
