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

    const emailInput = document.getElementById("email").value.trim();
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "sgsits.ac.in"]; // Add more if needed

    // Regular Expression for basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(emailInput)) {
        alert("Invalid email format. Please enter a valid email.");
        return;
    }

    // Extract username and domain from email
    const [username, emailDomain] = emailInput.split("@");

    // Check if domain is in the valid domains list
    if (!validDomains.includes(emailDomain)) {
        alert("Invalid email domain. Please use a valid email provider.");
        return;
    }

    // Check if username has more than 8 characters and contains at least one alphabet
    if (username.length > 8 && !/[a-zA-Z]/.test(username)) {
        alert("Username must contain at least one alphabet if it has more than 8 characters.");
        return;
    }

    const paymentFile = document.getElementById("payment-proof").files[0];
    if (!paymentFile) {
        alert("Please upload payment proof");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // 1. Upload payment proof to Flask server
                const paymentFormData = new FormData();
                paymentFormData.append("payment", paymentFile);

                const uploadResponse = await fetch('http://127.0.0.1:5000/upload-payment', {
                    method: 'POST',
                    body: paymentFormData
                });

                const uploadResult = await uploadResponse.json();
                
                if (!uploadResult.file_url) {
                    throw new Error("Payment proof upload failed");
                }

                // 2. Prepare registration data
                const urlParams = new URLSearchParams(window.location.search);
                const registrationData = {
                    eventId: urlParams.get("id"),
                    name: document.getElementById("name").value,
                    phone: document.getElementById("phone").value,
                    email: emailInput,
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
