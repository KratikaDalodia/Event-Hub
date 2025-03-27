import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const eventsHeading = document.querySelector(".event-list-container h2");
const eventsContainer = document.querySelector(".event-list-container .events");
const eventSearch = document.querySelector(".event-list-container .event-search");
const clubFilter = document.getElementById("clubFilter");
const monthFilter = document.getElementById("monthFilter");

let events = [];  // Array to store fetched events
let searchTerm = "";
let selectedClub = "";
let selectedMonth = "";

const getClubName = (title) => title.split(":")[0].trim();

const getMonth = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthIndex = new Date(date).getMonth();
    return monthNames[monthIndex];
};

// Fetch Events from Firestore
const fetchEvents = async () => {
    try {
        const querySnapshot = await getDocs(eventsRef);
        events = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log("Fetched events:", events);

        updateFilters();
        createEventListingCards();
    } catch (error) {
        console.error("Error fetching events:", error);
    }
};

// Update Filters Dynamically
const updateFilters = () => {
    clubFilter.innerHTML = `<option value="">All Clubs</option>`;
    monthFilter.innerHTML = `<option value="">All Months</option>`;

    const clubNames = [...new Set(events.map(event => getClubName(event.title)))];  
    clubNames.forEach(club => {
        let option = document.createElement("option");
        option.value = club;
        option.textContent = club;
        clubFilter.appendChild(option);
    });

    const eventMonths = [...new Set(events.map(event => getMonth(event.date)))];  
    eventMonths.forEach(month => {
        let option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        monthFilter.appendChild(option);
    });

    eventsHeading.innerHTML = `${events.length} Events`;
};

// Render Event Listing Cards
const createEventListingCards = () => {
    eventsContainer.innerHTML = "";

    let filteredEvents = events.filter(event => {
        let clubName = getClubName(event.title);
        let eventMonth = getMonth(event.date);

        return (
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedClub === "" || clubName === selectedClub) &&
            (selectedMonth === "" || eventMonth === selectedMonth)
        );
    });

    filteredEvents.forEach(event => {
        let eventCard = document.createElement("div");
        eventCard.classList.add("event");

        let image = document.createElement("img");
        image.src = event.image;  

        let title = document.createElement("h3");
        title.innerHTML = event.title; 
        title.classList.add("event-title");

        let details = document.createElement("p");
        details.innerHTML = event.details;  
        details.classList.add("details");

        let detailsBtn = document.createElement("a");
        detailsBtn.href = `/mainn/frontend/Events/details-page/details.html?id=${event.id}`;
        detailsBtn.innerHTML = "More Details";
        detailsBtn.classList.add("details-btn");

        let date = document.createElement("span");
        date.innerHTML = event.date;  
        date.classList.add("date");

        eventCard.appendChild(image);
        eventCard.appendChild(title);
        eventCard.appendChild(details);
        eventCard.appendChild(detailsBtn);
        eventCard.appendChild(date);

        eventsContainer.appendChild(eventCard);
    });

    eventsHeading.innerHTML = `${filteredEvents.length} Events`;
};

// Search & Filter
eventSearch.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    createEventListingCards();
});

clubFilter.addEventListener("change", (e) => {
    selectedClub = e.target.value;
    createEventListingCards();
});

monthFilter.addEventListener("change", (e) => {
    selectedMonth = e.target.value;
    createEventListingCards();
});

fetchEvents();

