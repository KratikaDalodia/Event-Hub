
const events = [
    {
        title: "Alumni Association: Virsa Vista",
        image: "/mainn/frontend/Event-imgs/asc.jpeg",
        details: "Begin your day with Rangmanch, where ethnic styles and captivating performances take center stage. As the evening unfolds, experience Saanjh - an epic night of music, dance and bonding under the stars.",
        date: "29 Sept 2025",
        venue: "Silveria",
        link: "eventRegister-page/eventRegister.html",
    },
    {
        title: "E-Cell: Multiverse of Mavens",
        image: "/mainn/frontend/Event-imgs/ecell.jpeg",
        details: "E-Summit is the annual flagship event of E-Cell, SGSITS. It is a confluence of industry veterans, business leaders, entrepreneurs, visionary students, and anyone who has a passion for entrepreneurship.",
        date: "15 Oct 2025",
        venue: "LT-201",
        link: "eventRegister-page/eventRegister.html",
    },
    {
        title: "GS Production House: Eclipse",
        image: "/mainn/frontend/Event-imgs/gsph.jpeg",
        details: "Eclipse is the annual cultural fest of GS Production House. It is a celebration of art, music, dance, and drama. It is a platform for students to showcase their talent and creativity.",
        date: "25 Nov 2025",
        venue: "Silveria",
        link: "eventRegister-page/eventRegister.html",
    },
    {
        title: "GS Production House: Media Summit",
        image: "/mainn/frontend/Event-imgs/gsph2.jpeg",
        details: "Media Summit is the annual event of GS Production House. It is a platform for students to interact with media professionals, learn about the latest trends in media, and explore career opportunities in the media industry.",
        date: "10 Dec 2025",
        venue: "LT-201",
        link: "eventRegister-page/eventRegister.html",
    },
    {
        title: "Computer Club: Tales and Trails",
        image: "/mainn/frontend/Event-imgs/tales n trails cc.jpeg",
        details: "Tales and Trails is the annual technical fest of Computer Club. It is a platform for students to showcase their technical skills, participate in coding competitions, and learn about the latest trends in technology.",
        date: "20 Jan 2026",
        venue: "Silveria",
        link: "eventRegister-page/eventRegister.html",
    },
    {
        title: "Pratibimb: Graffathon 2025",
        image: "/mainn/frontend/Event-imgs/Graffathon.jpeg",
        details: "Graffathon is the annual graffiti competition of Pratibimb. It is a platform for students to showcase their creativity, express their thoughts through art, and compete with other artists.",
        date: "5 Feb 2026",
        venue: "LT-201",
        link: "eventRegister-page/eventRegister.html",
    }
];

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const eventId = getQueryParam("id");

if (eventId !== null && events[eventId]) {
    const event = events[eventId];

    document.getElementById("event-title").innerText = event.title;
    document.getElementById("event-image").src = event.image;
    document.getElementById("event-description").innerText = event.details;
    document.getElementById("event-date").innerText = event.date;
    document.getElementById("event-venue").innerText = event.venue;
    document.getElementById("register-link").href = event.link;
} else {
    document.body.innerHTML = "<h1>Event Not Found</h1>";
}
