const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with a slight delay (can be done via CSS transition-delay or JS)
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Animate outline position slightly delayed via CSS transition
    // cursorOutline.animate({
    //     left: `${posX}px`,
    //     top: `${posY}px`
    // }, { duration: 300, fill: "forwards" });
});

// Add interaction effect on hoverable elements
const hoverables = document.querySelectorAll(
    "a, button, .project-card, .skill-card, .icon-button, .contact-link"
);

hoverables.forEach((el) => {
    el.addEventListener("mouseover", () => {
        cursorOutline.classList.add("cursor-interact");
    });
    el.addEventListener("mouseout", () => {
        cursorOutline.classList.remove("cursor-interact");
    });
});

