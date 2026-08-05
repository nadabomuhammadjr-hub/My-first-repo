function joinClub() {
    let name = prompt("Enter your Full Name:");

    if (name === null || name.trim() === "") {
        alert("Registration cancelled.");
        return;
    }

    alert(
        "🎉 Welcome " + name + "!\n\n" +
        "Thank you for joining the Cyber Security Club.\n\n" +
        "We are excited to have you as a member!"
    );
}

// Contact Button
function contactClub() {
    alert(
        "📞 Cyber Security Club\n\n" +
        "Email: cyberclub@gmail.com\n" +
        "Phone: +234 XXX XXX XXXX\n" +
        "Location: Federal University Gashua"
    );
}

// Welcome Message
window.onload = function () {
    console.log("Cyber Security Club Website Loaded Successfully!");

    setTimeout(function () {
        alert("🛡️ Welcome to the Cyber Security Club Website!");
    }, 1000);
};

// Smooth Scrolling for Navigation Links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const targetId = this.getAttribute("href");

        if (targetId !== "#") {
            document.querySelector(targetId).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Change Navbar Color While Scrolling
window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");

    if (window.scrollY > 50) {
        nav.style.background = "#00ff99";
        nav.style.color = "#000";
    } else {
        nav.style.background = "#161b22";
        nav.style.color = "#fff";
    }
});
