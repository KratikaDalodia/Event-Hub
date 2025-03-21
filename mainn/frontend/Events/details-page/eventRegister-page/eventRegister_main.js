import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyANWJFpmZK0AAK6j3-wRjKD_7ShHWtON4k",
    authDomain: "event-hub-e7f6c.firebaseapp.com",
    projectId: "event-hub-e7f6c",
    storageBucket: "event-hub-e7f6c.firebasestorage.app",
    messagingSenderId: "380985028611",
    appId: "1:380985028611:web:74718b5a32a841c4ec5e36",
    measurementId: "G-XCKT9FBD4F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const registrationsRef = collection(db, "registrations");

document.getElementById("event-registration-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id"); // Get event ID from URL
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const branch = document.getElementById("branch").value;
    const year = document.getElementById("year").value;
    const paymentScreenshot = document.getElementById("payment-proof").value;

    try {
        await addDoc(registrationsRef, {
            eventId,
            name,
            email,
            branch,
            year,
            paymentScreenshot
        });

        alert("Registration successful!");
        document.getElementById("event-registration-form").reset();
    } catch (error) {
        console.error("Error registering:", error);
        alert("Registration failed.");
    }
});