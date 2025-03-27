// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"; 
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import {  getFirestore, collection, query, where, getDocs, doc, getDoc  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// const AuthfirebaseConfig = {
//     apiKey: "AIzaSyAVxK1_lGtAaVH2WAEf7It9TLJKvV16EnU",
//     authDomain: "event-hub-68c11.firebaseapp.com",
//     databaseURL: "https://event-hub-68c11-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "event-hub-68c11",
//     storageBucket: "event-hub-68c11.appspot.com",
//     messagingSenderId: "899463910584",
//     appId: "1:899463910584:web:a80839e92cfd589e67904d",
//     measurementId: "G-3PW2XTLSHY"
// };

// const Authapp = initializeApp(AuthfirebaseConfig);
// const auth = getAuth(Authapp);

// const firebaseConfig = {
//     apiKey: "AIzaSyANWJFpmZK0AAK6j3-wRjKD_7ShHWtON4k",
//     authDomain: "event-hub-e7f6c.firebaseapp.com",
//     projectId: "event-hub-e7f6c",
//     storageBucket: "event-hub-e7f6c.appspot.com",  
//     messagingSenderId: "380985028611",
//     appId: "1:380985028611:web:74718b5a32a841c4ec5e36",
//     measurementId: "G-XCKT9FBD4F"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// async function testFirestore() {
//     try {
//         const testQuery = await getDocs(collection(db, "registrations"));
//         console.log("Firestore is connected successfully!");
//     } catch (error) {
//         console.error("Firestore connection error:", error);
//     }
// }

// // Call the function to check Firestore
// testFirestore();



// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"; 

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; 

const firebaseConfig = {
    apiKey: "AIzaSyANWJFpmZK0AAK6j3-wRjKD_7ShHWtON4k",
    authDomain: "event-hub-e7f6c.firebaseapp.com",
    projectId: "event-hub-e7f6c",
    storageBucket: "event-hub-e7f6c.appspot.com",
    messagingSenderId: "380985028611",
    appId: "1:380985028611:web:74718b5a32a841c4ec5e36",
    measurementId: "G-XCKT9FBD4F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        document.getElementById("user-email").innerText = user.email;
    } else {
        console.log("No user is logged in.");
        document.getElementById("user-email").innerText = "Not logged in";
    }
});