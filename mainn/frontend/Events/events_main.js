const events = [
    {
        title: "Alumni Association: Virsa Vista",
        image: "Event-imgs/asc.jpeg",
        details: "Begin your day with Rangmanch, where ethnic styles and captivating performances take center stage. As the evening unfolds, experience Saanjh - an epic night of music, dance and bonding under the stars.",
        date: "29 Sept 2025",
        link: "#",
    },
    {
        title: "E-Cell: Multiverse of Mavens",
        image: "Event-imgs/ecell.jpeg",
        details: "E-Summit is the annual flagship event of E-Cell, SGSITS. It is a confluence of industry veterans, business leaders, entrepreneurs, visionary students, and anyone who has a passion for entrepreneurship.",
        date: "15 Oct 2025",
        link: "#",
    },
    {
        title: "GS Production House: Eclipse",
        image: "Event-imgs/gsph.jpeg",
        details: "Eclipse is the annual cultural fest of GS Production House. It is a celebration of art, music, dance, and drama. It is a platform for students to showcase their talent and creativity.",
        date: "25 Nov 2025",
        link: "#",
    },
    {
        title: "GS Production House: Media Summit",
        image: "Event-imgs/gsph2.jpeg",
        details: "Media Summit is the annual event of GS Production House. It is a platform for students to interact with media professionals, learn about the latest trends in media, and explore career opportunities in the media industry.",
        date: "10 Dec 2025",
        link: "#",
    },
    {
        title: "Computer Club: Tales and Trails",
        image: "Event-imgs/tales n trails cc.jpeg",
        details: "Tales and Trails is the annual technical fest of Computer Club. It is a platform for students to showcase their technical skills, participate in coding competitions, and learn about the latest trends in technology.",
        date: "20 Jan 2026",
        link: "#",
    },
    {
        title: "Pratibimb: Graffathon 2025",
        image: "Event-imgs/Graffathon.jpeg",
        details: "Graffathon is the annual graffiti competition of Pratibimb. It is a platform for students to showcase their creativity, express their thoughts through art, and compete with other artists.",
        date: "5 Feb 2026",
        link: "#",
    }
]

const eventsHeading = document.querySelector(".event-list-container h2");
const eventsContainer = document.querySelector(".event-list-container .events");
const eventSearch = document.querySelector(".event-list-container .event-search");
let searchTerm = "";

eventsHeading.innerHTML = `${events.length} Events`;

const createEventListingCards = () => {
    eventsContainer.innerHTML = "";
    events.forEach(event => {
        if(event.title.toLowerCase().includes(searchTerm.toLowerCase())) {
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
        detailsBtn.href = event.link;
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
}
createEventListingCards();

eventSearch.addEventListener("input", (e) => {
    searchTerm = e.target.value;

    createEventListingCards();
});