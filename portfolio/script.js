gsap.registerPlugin(ScrollTrigger);

// Horizontal scrolling for the #horizontal section
const contents = gsap.utils.toArray("#horizontal div");

contents.forEach((content) => {
    gsap.set(content, { width: "100vw" }); // Ensure each div is full-screen width
});

// Horizontal scroll animation and pinning
ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
        // Larger screen animations
        gsap.to(contents, {
            xPercent: -100,
            scrollTrigger: {
                trigger: "#horizontal",
                scrub: 1,
                start: "top top",
                end: () => `+=${document.querySelector("#horizontal").scrollWidth - window.innerWidth * 2.2}`,
                pin: true,
            },
        });
    },
    "(max-width: 768px)": function () {
        // Smaller screen animations
        gsap.to(contents, {
            xPercent: -100,
            scrollTrigger: {
                trigger: "#horizontal",
                scrub: 1,
                start: "top top",
                end: () => `+=${document.querySelector("#horizontal").scrollWidth - window.innerWidth * 2}`,
                pin: true,
            },
        });
    },
});

// Animations for each section
const sectionAnimations = [
    {
        trigger: "#about",
        elements: ".about-content",
        animation: { opacity: 0, y: 50 }, // Fade-in from below
    },
    {
        trigger: "#projects",
        elements: ".project",
        animation: { opacity: 0, scale: 0.9 }, // Slight zoom-in
    },
    {
        trigger: "#skills",
        elements: ".skill",
        animation: { opacity: 0, y: 50 }, // Slide-in from below
    },
    {
        trigger: "#contact",
        elements: ".contact-info p",
        animation: { opacity: 0, x: 50 }, // Slide-in from the right
    },
];

// Apply animations to each section
sectionAnimations.forEach(({ trigger, elements, animation }) => {
    const items = gsap.utils.toArray(elements);

    items.forEach((item) => {
        gsap.from(item, {
            ...animation,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: trigger,
                start: "top 85%", // Animation triggers when the section is 85% into view
                end: "top 30%", // Ends slightly before it's fully in view
                scrub: false,
                once: true, // Play animation only once
            },
        });
    });
});

// Refresh animations when the window is resized
ScrollTrigger.refresh();
window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});
