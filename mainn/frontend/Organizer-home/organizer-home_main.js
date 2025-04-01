import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, query, where, getDocs, doc, deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
    getAuth, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase Configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

// Get Container for Events
const myEventsContainer = document.getElementById("my-events-list");

// Delete Event Function
async function deleteEvent(eventId, event) {
    event.stopPropagation(); // Prevent triggering the card click
    try {
        if (!confirm("Are you sure you want to delete this event?")) return;
        
        await deleteDoc(doc(db, "events", eventId));
        
        // Remove the event card from UI
        document.querySelector(`.event-card[data-event-id="${eventId}"]`)?.remove();
        
        alert("Event deleted successfully!");
        
        // If no events left, show message
        if (myEventsContainer.querySelectorAll('.event-card').length === 0) {
            myEventsContainer.innerHTML = "<p>No events created yet.</p>";
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event. Please try again.");
    }
}

// Function to load registered users for an event
async function loadRegisteredUsers(eventId) {
    const registrationsContainer = document.getElementById(`registrations-${eventId}`);
    const registrationsList = document.getElementById(`registrations-list-${eventId}`);
    
    // Toggle visibility
    if (registrationsContainer.style.display === 'block') {
        registrationsContainer.style.display = 'none';
        return;
    }
    
    // Clear other open registration lists
    document.querySelectorAll('.registrations-container').forEach(el => {
        if (el.id !== `registrations-${eventId}`) {
            el.style.display = 'none';
        }
    });
    
    // Show loading state
    registrationsList.innerHTML = '<p>Loading registrations...</p>';
    registrationsContainer.style.display = 'block';
    
    try {
        // Query registrations collection for this event
        const registrationsRef = collection(db, "registrations");
        const q = query(registrationsRef, where("eventId", "==", eventId));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            registrationsList.innerHTML = '<p>No registrations yet</p>';
            return;
        }
        
        // Build registrations list
        let registrationsHTML = '';
        querySnapshot.forEach((doc) => {
            const regData = doc.data();
            registrationsHTML += `
                <div class="registration-item">
                    <p><strong>Name:</strong> ${regData.name}</p>
                    <p><strong>Email:</strong> ${regData.email}</p>
                    <p><strong>Branch:</strong> ${regData.branch}</p>
                    <p><strong>Year:</strong> ${regData.year}</p>
                    ${regData.paymentScreenshot ? `<a href="${regData.paymentScreenshot}" target="_blank">View Payment Proof</a>` : ''}
                    <hr>
                </div>
            `;
        });
        
        registrationsList.innerHTML = registrationsHTML;
    } catch (error) {
        console.error("Error loading registrations:", error);
        registrationsList.innerHTML = '<p>Error loading registrations</p>';
    }
}

// Listen for Authentication State
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const organizerId = user.uid; // Get logged-in organizer's UID
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("createdBy", "==", organizerId));

        try {
            const querySnapshot = await getDocs(q);
            myEventsContainer.innerHTML = ""; // Clear previous content

            if (querySnapshot.empty) {
                myEventsContainer.innerHTML = "<p>No events created yet.</p>";
            } else {
                querySnapshot.forEach((doc) => {
                    const eventData = doc.data();
                    const eventElement = 
                        `
                        <div class="event-card" data-event-id="${doc.id}" onclick="loadRegisteredUsers('${doc.id}')">
                        <div class ="top">
                            ${eventData.image ? `<img src="${eventData.image}" alt="${eventData.title}" class="event-image">` : ''}
                            <div class="event-info">
                                <h3>${eventData.title}</h3>
                                <p><strong>Date:</strong> ${eventData.date}</p>
                                <p><strong>Venue:</strong> ${eventData.venue}</p>
                            </div>
                            <div class="event-actions">
                                <a href="/mainn/frontend/Organizer-home/edit-event/edit-event.html?id=${doc.id}" class="edit-btn" onclick="event.stopPropagation()"><button>Edit</button></a>
                                <button class="delete-btn" onclick="deleteEvent('${doc.id}', event)">Delete</button>
                            </div>
                            </div>
                            <div class="bottom">
                            <div class="registrations-container" id="registrations-${doc.id}" style="display:none;">
                                <h4>Registered Users</h4>
                                <div class="registrations-list" id="registrations-list-${doc.id}"></div>
                            </div>
                            </div>
                        </div>
                    `;
                    myEventsContainer.innerHTML += eventElement;
                });
            }
        } catch (error) {
            console.error("Error fetching organizer events:", error);
            myEventsContainer.innerHTML = "<p>Error loading events. Please try again later.</p>";
        }
    } else {
        console.log("No user is signed in.");
        myEventsContainer.innerHTML = "<p>Please log in to see your events.</p>";
    }
});

// Make functions available globally
window.deleteEvent = deleteEvent;
window.loadRegisteredUsers = loadRegisteredUsers;