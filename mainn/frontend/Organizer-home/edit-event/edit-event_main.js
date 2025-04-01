import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, doc, getDoc, updateDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
    getAuth, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your Firebase configuration
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

// Get event ID from URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

// Load event data when page loads
document.addEventListener('DOMContentLoaded', async () => {
    if (!eventId) {
        alert('No event specified!');
        window.location.href = '/mainn/frontend/Organizer-home/organizer-home.html';
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const eventDoc = doc(db, 'events', eventId);
                const eventSnapshot = await getDoc(eventDoc);
                
                if (eventSnapshot.exists()) {
                    const eventData = eventSnapshot.data();
                    
                    // Verify the current user is the event creator
                    if (eventData.createdBy !== user.uid) {
                        alert('You are not authorized to edit this event!');
                        window.location.href = '/mainn/frontend/Organizer-home/organizer-home.html';
                        return;
                    }
                    
                    // Fill form with existing data
                    document.getElementById('eventName').value = eventData.title || '';
                    document.getElementById('eventDate').value = eventData.date || '';
                    document.getElementById('eventLocation').value = eventData.venue || '';
                    document.getElementById('eventDescription').value = eventData.details || '';
                    
                    // Display current image if exists
                    const imageElement = document.getElementById('uploadedImage');
                    if (eventData.image) {
                        imageElement.src = eventData.image;
                        imageElement.style.display = 'block';
                    }
                    
                    // Store current image URL in case user doesn't upload a new one
                    document.getElementById('editEventForm').dataset.currentImage = eventData.image || '';
                } else {
                    alert('Event not found!');
                    window.location.href = '/mainn/frontend/Organizer-home/organizer-home.html';
                }
            } catch (error) {
                console.error('Error loading event:', error);
                alert('Failed to load event data');
            }
        } else {
            alert('You must be logged in to edit an event!');
            window.location.href = '/mainn/org_login.html';
        }
    });
});

// Handle form submission
document.getElementById('editEventForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const eventDoc = doc(db, 'events', eventId);
                
                // Check if a new image was uploaded
                const imageFile = document.getElementById('eventImage').files[0];
                let imageUrl = document.getElementById('editEventForm').dataset.currentImage;
                
                if (imageFile) {
                    // Upload new image to Flask server
                    const formData = new FormData();
                    formData.append("image", imageFile);
                    
                    const uploadResponse = await fetch('http://127.0.0.1:5000/upload', {
                        method: 'POST',
                        body: formData
                    });
                    
                    const uploadResult = await uploadResponse.json();
                    if (uploadResult.image_url) {
                        imageUrl = uploadResult.image_url;
                    } else {
                        throw new Error('Image upload failed');
                    }
                }
                
                // Prepare updated event data
                const updatedData = {
                    title: document.getElementById('eventName').value,
                    date: document.getElementById('eventDate').value,
                    venue: document.getElementById('eventLocation').value,
                    details: document.getElementById('eventDescription').value,
                    image: imageUrl,
                    lastUpdated: new Date().toISOString() // Add update timestamp
                };
                
                // Update the document in Firestore
                await updateDoc(eventDoc, updatedData);
                
                alert('Event updated successfully!');
                window.location.href = `/mainn/frontend/Organizer-home/organizer-home.html`;
                
            } catch (error) {
                console.error('Error updating event:', error);
                alert('Failed to update event. Please try again.');
            }
        } else {
            alert('You must be logged in to edit an event!');
            window.location.href = '/mainn/org_login.html';
        }
    });
});