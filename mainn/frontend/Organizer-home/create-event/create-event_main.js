import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
    getAuth, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const eventsRef = collection(db, "events");


document.getElementById('eventForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            let organizerId = user.uid; 

            let formData = new FormData();
            formData.append("image", document.getElementById('eventImage').files[0]);

            try {
                // Step 1: Upload image to Flask server
                let uploadResponse = await fetch('http://127.0.0.1:5000/upload', {
                    method: 'POST',
                    body: formData
                });

                let uploadResult = await uploadResponse.json();

                if (uploadResult.image_url) {
                    // Step 2: Collect event details from form
                    let eventData = {
                        title: document.getElementById('eventName').value,
                        date: document.getElementById('eventDate').value,
                        venue: document.getElementById('eventLocation').value,
                        details: document.getElementById('eventDescription').value,
                        image: uploadResult.image_url, 
                        createdBy: organizerId,
                        timestamp: new Date().toISOString() // Store timestamp
                    };

                    // Step 3: Store event details in Firestore
                    await addDoc(eventsRef, eventData);

                    alert("Event created successfully!");
                    document.getElementById("eventForm").reset();
                } else {
                    alert("Image upload failed!");
                }

            } catch (error) {
                console.error("Error creating event:", error);
                alert("Failed to create event. Please try again.");
            }

        } else {
            alert("You must be logged in to create an event.");
        }
    });
});
