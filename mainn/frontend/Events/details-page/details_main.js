import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


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

const getEventIdFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
};

const eventId = getEventIdFromURL();
if (eventId) {
    const fetchEventDetails = async () => {
        try {
            const eventDoc = await getDoc(doc(db, "events", eventId));

            if (eventDoc.exists()) {
                const event = { id: eventDoc.id, ...eventDoc.data() };

                document.getElementById("event-title").textContent = event.title;
                document.getElementById("event-date").textContent = event.date;
                document.getElementById("event-description").textContent = event.details;
                document.getElementById("event-image").src = event.image.replace("uc?export=view", "thumbnail") + "&sz=w1000";
                document.getElementById("event-venue").textContent = event.venue;
                console.log("Event ID:", event.id);
                document.getElementById("register-link").href = `/mainn/frontend/Events/details-page/eventRegister-page/eventRegister.html?id=${event.id}`;
            } else {
                document.getElementById("event-details").innerHTML = "<p>Event not found!</p>";
            }
        } catch (error) {
            console.error("Error fetching event details:", error);
        }
    };

    fetchEventDetails();
} else {
    document.getElementById("event-details").innerHTML = "<p>Invalid Event ID!</p>";
}