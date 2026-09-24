document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuClose = document.querySelector(".menu-close");
    const mobileMenu = document.querySelector(".mobile-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const mobileLinks = document.querySelectorAll(".mobile-navbar a");
    const hero = document.querySelector(".about-hero");
    const heroContent = document.querySelector(".about-hero-content");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* Mobile menu */
    function openMenu() {
        mobileMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");

        if (!prefersReducedMotion) {
            mobileLinks.forEach((link, index) => {
                link.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateX(30px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateX(0)"
                        }
                    ],
                    {
                        duration: 450,
                        delay: index * 70,
                        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                        fill: "forwards"
                    }
                );
            });
        }
    }

    function closeMenu() {
        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
    }

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.addEventListener("click", openMenu);
    }

    if (menuClose) {
        menuClose.addEventListener("click", closeMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    /* Header scroll effect */
    function handleHeader() {
        if (window.scrollY > 70) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader, {
        passive: true
    });

    handleHeader();

    /* Hero entrance animation */
    if (!prefersReducedMotion && heroContent) {
        const heroItems = [
            heroContent.querySelector(".hero-line"),
            heroContent.querySelector(".eyebrow"),
            heroContent.querySelector("h1"),
            heroContent.querySelector(".hero-description"),
            heroContent.querySelector(".text-link")
        ];

        heroItems.forEach((item, index) => {
            if (!item) return;

            item.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(35px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 900,
                    delay: 250 + index * 130,
                    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                    fill: "forwards"
                }
            );
        });
    }

    /* Hero parallax */
    if (!prefersReducedMotion && hero) {
        window.addEventListener("scroll", () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition <= hero.offsetHeight) {
                hero.style.backgroundPosition = `center ${50 + scrollPosition * 0.025}%`;
            }
        }, {
            passive: true
        });
    }

    /* Reveal animation */
    const revealElements = document.querySelectorAll(
        ".story-content, .story-visual, .values-heading, .journey-intro, .journey-image, .team-intro, .team-content, .about-cta .cta-content, .contact-details"
    );

    if (!prefersReducedMotion) {
        revealElements.forEach(element => {
            element.style.opacity = "0";
            element.style.transform = "translateY(45px)";
        });
    }

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                if (!prefersReducedMotion) {
                    entry.target.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(45px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 900,
                            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                            fill: "forwards"
                        }
                    );
                }

                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* Story image reveal */
    const storyImages = document.querySelectorAll(
        ".story-main-image, .story-secondary-image"
    );

    if (!prefersReducedMotion) {
        storyImages.forEach((image, index) => {
            image.style.opacity = "0";
            image.style.transform = index === 0
                ? "translateX(-35px) scale(0.96)"
                : "translateX(35px) scale(0.96)";
        });
    }

    const storyObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const images = entry.target.parentElement.querySelectorAll(
                    ".story-main-image, .story-secondary-image"
                );

                images.forEach((image, index) => {
                    if (!prefersReducedMotion) {
                        image.animate(
                            [
                                {
                                    opacity: 0,
                                    transform: index === 0
                                        ? "translateX(-35px) scale(0.96)"
                                        : "translateX(35px) scale(0.96)"
                                },
                                {
                                    opacity: 1,
                                    transform: "translateX(0) scale(1)"
                                }
                            ],
                            {
                                duration: 1000,
                                delay: index * 180,
                                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                                fill: "forwards"
                            }
                        );
                    }
                });

                storyObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.25
        }
    );

    const storyVisual = document.querySelector(".story-visual");

    if (storyVisual) {
        storyObserver.observe(storyVisual);
    }

    /* Values stagger animation */
    const valueItems = document.querySelectorAll(".value-item");

    if (!prefersReducedMotion) {
        valueItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(25px)";
        });
    }

    const valuesObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                valueItems.forEach((item, index) => {
                    item.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(25px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 650,
                            delay: index * 100,
                            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                            fill: "forwards"
                        }
                    );
                });

                valuesObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.2
        }
    );

    const valuesGrid = document.querySelector(".values-grid");

    if (valuesGrid) {
        valuesObserver.observe(valuesGrid);
    }

    /* Timeline animation */
    const timelineItems = document.querySelectorAll(".timeline-item");

    if (!prefersReducedMotion) {
        timelineItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
        });
    }

    const timelineObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                timelineItems.forEach((item, index) => {
                    item.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(20px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 600,
                            delay: index * 140,
                            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                            fill: "forwards"
                        }
                    );
                });

                timelineObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.25
        }
    );

    const timeline = document.querySelector(".timeline");

    if (timeline) {
        timelineObserver.observe(timeline);
    }

    /* Team animation */
    const teamMembers = document.querySelectorAll(".team-member");

    if (!prefersReducedMotion) {
        teamMembers.forEach(member => {
            member.style.opacity = "0";
            member.style.transform = "translateY(30px)";
        });
    }

    const teamObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                teamMembers.forEach((member, index) => {
                    member.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(30px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 700,
                            delay: index * 160,
                            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                            fill: "forwards"
                        }
                    );
                });

                teamObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.2
        }
    );

    const teamSection = document.querySelector(".team-section");

    if (teamSection) {
        teamObserver.observe(teamSection);
    }

    /* Image hover movement */
    const interactiveImages = document.querySelectorAll(
        ".story-main-image img, .story-secondary-image img, .journey-image img, .team-image img"
    );

    interactiveImages.forEach(image => {
        image.addEventListener("mouseenter", () => {
            if (prefersReducedMotion) return;

            image.animate(
                [
                    {
                        transform: "scale(1)"
                    },
                    {
                        transform: "scale(1.04)"
                    }
                ],
                {
                    duration: 700,
                    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                    fill: "forwards"
                }
            );
        });

        image.addEventListener("mouseleave", () => {
            if (prefersReducedMotion) return;

            image.animate(
                [
                    {
                        transform: "scale(1.04)"
                    },
                    {
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 700,
                    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                    fill: "forwards"
                }
            );
        });
    });

    /* Mouse movement on hero */
    if (!prefersReducedMotion && hero) {
        hero.addEventListener("mousemove", event => {
            const rect = hero.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            const moveX = x * 8;
            const moveY = y * 5;

            heroContent.style.transform =
                `translate3d(${moveX}px, ${moveY}px, 0)`;
        });

        hero.addEventListener("mouseleave", () => {
            heroContent.style.transform =
                "translate3d(0, 0, 0)";
        });
    }

    /* Smooth anchor navigation */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });
});