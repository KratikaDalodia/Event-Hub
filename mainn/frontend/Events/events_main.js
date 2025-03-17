const events = [
    {
        title: "Alumni Association: Virsa Vista",
        image: "/mainn/frontend/Event-imgs/asc.jpeg",
        details: "Begin your day with Rangmanch, where ethnic styles and captivating performances take center stage. As the evening unfolds, experience Saanjh - an epic night of music, dance and bonding under the stars.",
        date: "29 Sept 2025",
        link: "#",
    },
    {
        title: "E-Cell: Multiverse of Mavens",
        image: "/mainn/frontend/Event-imgs/ecell.jpeg",
        details: "E-Summit is the annual flagship event of E-Cell, SGSITS. It is a confluence of industry veterans, business leaders, entrepreneurs, visionary students, and anyone who has a passion for entrepreneurship.",
        date: "15 Oct 2025",
        link: "#",
    },
    {
        title: "GS Production House: Eclipse",
        image: "/mainn/frontend/Event-imgs/gsph.jpeg",
        details: "Eclipse is the annual cultural fest of GS Production House. It is a celebration of art, music, dance, and drama. It is a platform for students to showcase their talent and creativity.",
        date: "25 Nov 2025",
        link: "#",
    },
    {
        title: "GS Production House: Media Summit",
        image: "/mainn/frontend/Event-imgs/gsph2.jpeg",
        details: "Media Summit is the annual event of GS Production House. It is a platform for students to interact with media professionals, learn about the latest trends in media, and explore career opportunities in the media industry.",
        date: "10 Dec 2025",
        link: "#",
    },
    {
        title: "Computer Club: Tales and Trails",
        image: "/mainn/frontend/Event-imgs/tales n trails cc.jpeg",
        details: "Tales and Trails is the annual technical fest of Computer Club. It is a platform for students to showcase their technical skills, participate in coding competitions, and learn about the latest trends in technology.",
        date: "20 Jan 2026",
        link: "#",
    },
    {
        title: "Pratibimb: Graffathon 2025",
        image: "/mainn/frontend/Event-imgs/Graffathon.jpeg",
        details: "Graffathon is the annual graffiti competition of Pratibimb. It is a platform for students to showcase their creativity, express their thoughts through art, and compete with other artists.",
        date: "5 Feb 2026",
        link: "#",
    }
]

const eventsHeading = document.querySelector(".event-list-container h2");
const eventsContainer = document.querySelector(".event-list-container .events");
const eventSearch = document.querySelector(".event-list-container .event-search");
const clubFilter = document.getElementById("clubFilter");
const monthFilter = document.getElementById("monthFilter");


const getClubName = (title) => title.split(":")[0].trim();

const getMonth = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthIndex = new Date(date).getMonth();
    return monthNames[monthIndex];
};

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

let searchTerm = "";
let selectedClub = "";
let selectedMonth = "";

eventsHeading.innerHTML = `${events.length} Events`;

const createEventListingCards = () => {
    eventsContainer.innerHTML = "";
    events.forEach(event => {
        let clubName = getClubName(event.title);
        let eventMonth = getMonth(event.date);

        if (
            (event.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedClub === "" || clubName === selectedClub) &&
            (selectedMonth === "" || eventMonth === selectedMonth)
        ) {
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
            detailsBtn.href = `details-page/details.html?id=${events.indexOf(event)}`;
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
        }
    });
};

// Event listeners for search and filter changes
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

// Initial call
createEventListingCards();

// eventsHeading.innerHTML = `${events.length} Events`;

// const createEventListingCards = () => {
//     eventsContainer.innerHTML = "";
//     events.forEach((event,index) => {
//         if(event.title.toLowerCase().includes(searchTerm.toLowerCase())) {
//         let eventCard = document.createElement("div");
//         eventCard.classList.add("event");

//         let image = document.createElement("img");
//         image.src = event.image;

//         let title = document.createElement("h3");
//         title.innerHTML = event.title;
//         title.classList.add("event-title");

//         let details = document.createElement("p");
//         details.innerHTML = event.details;
//         details.classList.add("details");

//         let detailsBtn = document.createElement("a");
//         detailsBtn.href = `details-page/details.html?id=${index}`;  
//         detailsBtn.innerHTML = "More Details";
//         detailsBtn.classList.add("details-btn");

//         let date = document.createElement("span");
//         date.innerHTML = event.date;
//         date.classList.add("date");

//         eventCard.appendChild(image);
//         eventCard.appendChild(title);
//         eventCard.appendChild(details);
//         eventCard.appendChild(detailsBtn);
//         eventCard.appendChild(date);

//         eventsContainer.appendChild(eventCard);
//         }
//     });
// }
// createEventListingCards();

// eventSearch.addEventListener("input", (e) => {
//     searchTerm = e.target.value;

//     createEventListingCards();
// });