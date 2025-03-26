    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

    const eventsRef = collection(db, "events");

    document.getElementById("eventForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("eventName").value;
        const date = document.getElementById("eventDate").value;
        const venue = document.getElementById("eventLocation").value;
        const details = document.getElementById("eventDescription").value;
        let image = document.getElementById("eventImage").value;

        image = convertGoogleDriveLink(eventImage);

        try {
            await addDoc(eventsRef, {
                name,
                date,
                venue,
                details,
                image,
            });

            alert("Event created successfully!");
            document.getElementById("eventForm").reset();
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Failed to create event. Please try again.");
        }
    });
    function convertGoogleDriveLink(link) {
        if (typeof link !== "string") {
            console.error("Invalid link:", link); // Debugging output
            return ""; // Return empty string or handle it appropriately
        }
        const match = link.match(/[-\w]{25,}/); // Extract file ID
        return match ? `https://drive.google.com/uc?export=view&id=${match[0]}&sz=1000` : link;
    }
    
    
    
    
    