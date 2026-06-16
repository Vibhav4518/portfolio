// =========================
// Navbar Scroll Effect
// =========================
const navbar =
document.querySelector(".navbar");

window.addEventListener(
    "scroll",
    () => {

        if (navbar) {

            navbar.style.background =
                window.scrollY > 50
                ? "#111827"
                : "rgba(13,17,23,0.9)";

            navbar.style.boxShadow =
                window.scrollY > 50
                ? "0 4px 15px rgba(0,0,0,0.3)"
                : "none";
        }
    }
);

// =========================
// Active Navbar
// =========================
const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-link");

window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(
            (section) => {

                const top =
                    section.offsetTop - 120;

                const height =
                    section.clientHeight;

                if (
                    window.scrollY >= top &&
                    window.scrollY <
                    top + height
                ) {
                    current =
                    section.id;
                }
            }
        );

        navLinks.forEach(
            (link) => {

                link.classList.toggle(
                    "active",
                    link.getAttribute(
                        "href"
                    ) === `#${current}`
                );
            }
        );
    }
);

// =========================
// Typing Effect
// =========================
const text =
"Frontend Developer | Tech Enthusiast";

const target =
document.querySelector(".lead");

let index = 0;

function typingEffect() {

    if (
        target &&
        index < text.length
    ) {

        target.innerHTML +=
        text.charAt(index);

        index++;

        setTimeout(
            typingEffect,
            70
        );
    }
}

window.addEventListener(
    "load",
    () => {

        if (target) {

            target.innerHTML = "";

            typingEffect();
        }
    }
);

// =========================
// Bootstrap Project Modal
// =========================
function showProjectInfo(
    title,
    description
) {

    const modalTitle =
    document.getElementById(
        "modalTitle"
    );

    const modalDescription =
    document.getElementById(
        "modalDescription"
    );

    const projectModal =
    document.getElementById(
        "projectModal"
    );

    if (
        modalTitle &&
        modalDescription &&
        projectModal
    ) {

        modalTitle.innerText =
        title;

        modalDescription.innerText =
        description;

        new bootstrap.Modal(
            projectModal
        ).show();
    }
}

// =========================
// Resume Popup
// =========================
const resumeBtn =
document.getElementById(
    "resumeBtn"
);

const resumeModal =
document.getElementById(
    "resumeModal"
);

const closeBtn =
document.querySelector(
    ".close-btn"
);

function toggleResume(show){

    if (resumeModal){

        resumeModal.style.display =
        show ? "flex" : "none";

        document.body.style.overflow =
        show ? "hidden" : "auto";
    }
}

if (resumeBtn){

    resumeBtn.addEventListener(
        "click",
        () => toggleResume(true)
    );
}

if (closeBtn){

    closeBtn.addEventListener(
        "click",
        () => toggleResume(false)
    );
}

window.addEventListener(
    "click",
    (e) => {

        if (
            e.target ===
            resumeModal
        ) {

            toggleResume(false);
        }
    }
);

// =========================
// Certificate Popup
// =========================
const popup =
document.getElementById(
    "certificatePopup"
);

const popupImage =
document.getElementById(
    "popupImage"
);

const closePopup =
document.getElementById(
    "closePopup"
);

function togglePopup(
    show,
    src = ""
){

    if (
        popup &&
        popupImage
    ){

        popup.style.display =
        show ? "flex" : "none";

        popupImage.src = src;

        document.body.style.overflow =
        show ? "hidden" : "auto";
    }
}

const certificateImages =
document.querySelectorAll(
    ".certificate-img"
);

certificateImages.forEach(
    (img) => {

        img.addEventListener(
            "click",
            () => {

                togglePopup(
                    true,
                    img.src
                );
            }
        );
    }
);

if (closePopup){

    closePopup.addEventListener(
        "click",
        () => togglePopup(false)
    );
}

if (popup){

    popup.addEventListener(
        "click",
        (e) => {

            if (
                e.target === popup
            ){

                togglePopup(false);
            }
        }
    );
}