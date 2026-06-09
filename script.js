// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    navbar.style.background =
        window.scrollY > 50 ? "#111827" : "rgba(13,17,23,0.9)";

    navbar.style.boxShadow =
        window.scrollY > 50
        ? "0 4px 15px rgba(0,0,0,0.3)"
        : "none";
});

// Active Navbar
const sections = document.querySelectorAll("section"),
      navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120,
              height = section.clientHeight;

        if (pageYOffset >= top && pageYOffset < top + height)
            current = section.id;
    });

    navLinks.forEach(link =>
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        )
    );
});

// Typing Effect
const text = "Frontend Developer | Tech Enthusiast",
      target = document.querySelector(".lead");

let index = 0;

function typingEffect() {
    if (index < text.length) {
        target.innerHTML += text[index++];
        setTimeout(typingEffect, 70);
    }
}

window.onload = () => {
    target.innerHTML = "";
    typingEffect();
};

// Bootstrap Project Modal
function showProjectInfo(title, description) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDescription").innerText = description;

    new bootstrap.Modal(
        document.getElementById("projectModal")
    ).show();
}

// Resume Popup
const resumeBtn = document.getElementById("resumeBtn"),
      resumeModal = document.getElementById("resumeModal"),
      closeBtn = document.querySelector(".close-btn");

const toggleResume = show => {
    resumeModal.style.display = show ? "flex" : "none";
    document.body.style.overflow = show ? "hidden" : "auto";
};

resumeBtn?.addEventListener("click", () => toggleResume(true));
closeBtn?.addEventListener("click", () => toggleResume(false));

window.addEventListener("click", e => {
    if (e.target === resumeModal)
        toggleResume(false);
});

// Certificate Popup
const popup = document.getElementById("certificatePopup"),
      popupImage = document.getElementById("popupImage"),
      closePopup = document.getElementById("closePopup");

const togglePopup = (show, src = "") => {
    popup.style.display = show ? "flex" : "none";
    popupImage.src = src;
    document.body.style.overflow = show ? "hidden" : "auto";
};

document.querySelectorAll(".certificate-img")
.forEach(img =>
    img.addEventListener("click", () =>
        togglePopup(true, img.src)
    )
);

closePopup?.addEventListener("click",
    () => togglePopup(false)
);

popup?.addEventListener("click", e => {
    if (e.target === popup)
        togglePopup(false);
});