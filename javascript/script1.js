document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const revealElements = document.querySelectorAll(
        ".about-preview, .services-preview, .projects-preview, .why-us, .testimonials-preview, .contact-cta"
    );
    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");
    const projectCards = document.querySelectorAll(".project-card");
    const serviceCards = document.querySelectorAll(".service-card");
    const yearElement = document.querySelector(".footer-bottom p");

    /* Header scroll effect */
    function handleHeader() {
        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader);
    handleHeader();

    /* Reveal animation */
    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* Hero parallax */
    if (hero && heroContent) {
        window.addEventListener("scroll", () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition < hero.offsetHeight) {
                heroContent.style.transform =
                    `translateY(${scrollPosition * 0.12}px)`;

                hero.style.backgroundPosition =
                    `center ${scrollPosition * 0.08}px`;
            }
        });
    }

    /* Service card interaction */
    serviceCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            serviceCards.forEach(item => {
                item.classList.remove("featured");
            });

            card.classList.add("featured");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("featured");
        });
    });

    /* Project card interaction */
    projectCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("active");
        });
    });

    /* Update copyright year */
    if (yearElement) {
        const currentYear = new Date().getFullYear();

        yearElement.textContent =
            `© ${currentYear} Traditional Builder. All rights reserved.`;
    }

    /* Image fallback */
    const images = document.querySelectorAll("img");

    images.forEach(image => {
        image.addEventListener("error", () => {
            image.classList.add("image-error");
        });
    });

});

const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const mobileMenu = document.querySelector(".mobile-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const mobileLinks = document.querySelectorAll(".mobile-navbar a");

function openMenu() {
    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");
    document.body.classList.add("menu-open");
}

function closeMenu() {
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});