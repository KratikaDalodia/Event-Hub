import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
emailjs.init("rl5iE5kymYmtw8u_t"); // Your Email.js key

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
const db = getFirestore(app);
const auth = getAuth(app);
const registrationsRef = collection(db, "registrations");

document.getElementById("event-registration-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const paymentFile = document.getElementById("payment-proof").files[0];
    if (!paymentFile) {
        alert("Please upload payment proof");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // 1. Upload payment proof to Flask server
                // Upload payment proof
                const paymentFormData = new FormData();
                paymentFormData.append("payment", paymentFile); // Note the field name is "payment"

                const uploadResponse = await fetch('http://127.0.0.1:5000/upload-payment', {
                    method: 'POST',
                    body: paymentFormData
                });

                const uploadResult = await uploadResponse.json();
                const paymentProofUrl = uploadResult.file_url;
                
                if (!uploadResult.file_url) {
                    throw new Error("Payment proof upload failed");
                }

                // 2. Prepare registration data
                const urlParams = new URLSearchParams(window.location.search);
                const registrationData = {
                    eventId: urlParams.get("id"),
                    name: document.getElementById("name").value,
                    phone: document.getElementById("phone").value,
                    email: document.getElementById("email").value,
                    branch: document.getElementById("branch").value,
                    year: document.getElementById("year").value,
                    paymentScreenshot: uploadResult.file_url,
                    userId: user.uid, // Store user ID who registered
                    registeredAt: new Date().toISOString()
                };

                // 3. Save to Firestore
                await addDoc(registrationsRef, registrationData);

                // 4. Send confirmation email
                await emailjs.send("service_uj9dzgb", "template_0bd9d78", {
                    to_email: registrationData.email,
                });

                alert("Registration successful! Confirmation email sent.");
                document.getElementById("event-registration-form").reset();
                
            } catch (error) {
                console.error("Registration error:", error);
                alert("Registration failed: " + error.message);
            }
        } else {
            alert("Please sign in to register for events");
        }
    });
});