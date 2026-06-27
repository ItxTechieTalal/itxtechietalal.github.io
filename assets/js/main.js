/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  const menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menuBtn = document.getElementById("myNavMenu");
    menuBtn.className = "nav-menu";
  });
});

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () {
  headerShadow();
};

function headerShadow() {
  const navHeader = document.getElementById("header");
  const scrolledHeight = window.innerWidth <= 940 ? "78px" : "70px";
  const normalHeight = window.innerWidth <= 940 ? "78px" : "88px";

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 14px rgba(34, 38, 47, 0.1)";
    navHeader.style.height = scrolledHeight;
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = normalHeight;
  }
}

/* ----- TYPING EFFECT ----- */
if (window.Typed) {
  new Typed(".typedText", {
    strings: [
      "Unity Developer",
      "Gameplay Programmer",
      "Mobile Game Developer",
      "Multiplayer Builder",
    ],
    loop: true,
    typeSpeed: 90,
    backSpeed: 60,
    backDelay: 1700,
  });
}

/* ----- SCROLL REVEAL ANIMATION ----- */
if (window.ScrollReveal) {
  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 1200,
    reset: false,
  });

  sr.reveal(".featured-text-card", {});
  sr.reveal(".featured-name", { delay: 100 });
  sr.reveal(".featured-text-info", { delay: 180 });
  sr.reveal(".hero-highlights", { delay: 230 });
  sr.reveal(".featured-text-btn", { delay: 280 });
  sr.reveal(".social_icons", { delay: 320 });
  sr.reveal(".featured-image", { delay: 260 });
  sr.reveal(".top-header", {});
  sr.reveal(".stat-card", { interval: 120 });
  sr.reveal(".experience-card", { interval: 140 });
  sr.reveal(".project-card", { interval: 140 });

  const srLeft = ScrollReveal({
    origin: "left",
    distance: "60px",
    duration: 1200,
    reset: false,
  });

  srLeft.reveal(".about-info", { delay: 100 });
  srLeft.reveal(".contact-info", { delay: 100 });

  const srRight = ScrollReveal({
    origin: "right",
    distance: "60px",
    duration: 1200,
    reset: false,
  });

  srRight.reveal(".skills-panel", { delay: 100 });
  srRight.reveal(".form-control", { delay: 100 });
}

/* ----- PROJECT IMAGE FALLBACKS ----- */
document.querySelectorAll(".project-media img").forEach((image) => {
  const media = image.closest(".project-media");

  function markMissing() {
    media.classList.add("is-missing");
    image.hidden = true;
  }

  function markLoaded() {
    media.classList.add("has-image");
  }

  image.addEventListener("error", markMissing);
  image.addEventListener("load", markLoaded);

  if (image.complete && image.naturalWidth === 0) {
    markMissing();
  } else if (image.complete) {
    markLoaded();
  }
});

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 90;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(
      ".nav-menu a[href*=" + sectionId + "]",
    );

    if (!navLink) {
      return;
    }

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

/* ----- AUTO PROJECT SLIDER ----- */
const projectGalleries = document.querySelectorAll(".project-gallery");

projectGalleries.forEach((gallery) => {
  const slides = gallery.querySelectorAll("img");
  let currentIndex = 0;

  if (slides.length === 0) return;

  slides[currentIndex].classList.add("active");

  setInterval(() => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }, 2800);
});

const contactForm = document.getElementById("contact-form");
const EMAILJS_USER_ID = "YOUR_EMAILJS_USER_ID";
const EMAILJS_SERVICE_ID = "service_16v515k";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

const emailJsIsConfigured =
  window.emailjs &&
  EMAILJS_USER_ID.startsWith("user_") &&
  EMAILJS_SERVICE_ID.startsWith("service_") &&
  EMAILJS_TEMPLATE_ID.startsWith("template_");

if (emailJsIsConfigured) {
  emailjs.init(EMAILJS_USER_ID);
}

console.log(
  "EmailJS available:",
  !!window.emailjs,
  "configured:",
  emailJsIsConfigured,
);

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm
      .querySelector("input[name='from_name']")
      .value.trim();
    const email = contactForm
      .querySelector("input[name='reply_to']")
      .value.trim();
    const message = contactForm
      .querySelector("textarea[name='message']")
      .value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields before sending your message.");
      return;
    }

    if (emailJsIsConfigured) {
      emailjs
        .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => {
          alert("Message sent! Thank you for reaching out.");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          alert("Unable to send message. Please try again later.");
        });
      return;
    }

    const subject = `Portfolio enquiry from ${name}`;
    const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\n${message}`;
    const gmailCompose = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=mtalalrasheed127@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    alert("EmailJS is not configured yet. Opening Gmail compose.");
    window.location.href = gmailCompose;
  });
}
