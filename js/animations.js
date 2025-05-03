// Scroll Animations using Intersection Observer
const sections = document.querySelectorAll(".section");

const sectionObserverOptions = {
    root: null, // relative to document viewport
    rootMargin: "0px",
    threshold: 0.1 // Trigger when 10% of the section is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: Unobserve after animation if you only want it once
            // observer.unobserve(entry.target);
        }
        // Optional: Remove class if you want animation on scroll up too
        // else {
        //     entry.target.classList.remove("visible");
        // }
    });
}, sectionObserverOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Typing Animation for Hero Headline (Kept as requested for 'main title' area)
const animatedElement = document.getElementById("hero-main-title");
// Use the correct data-translate attribute key from the current index.html
const originalTextKey = animatedElement ? animatedElement.getAttribute("data-translate") : null;
let currentTextKey = originalTextKey; // Store the key to re-fetch on language change
let i = 0;
let isDeleting = false;
let typingSpeed = 100; // Milliseconds

function typeWriter() {
    if (!animatedElement || !currentTextKey) return;

    // Ensure siteContent is available
    if (typeof siteContent === 'undefined') {
        console.error("siteContent is not defined. Cannot perform typing animation.");
        return;
    }

    const currentLang = localStorage.getItem("language") || "en";
    const textToType = siteContent[currentLang] && siteContent[currentLang][currentTextKey] ? siteContent[currentLang][currentTextKey] : "";

    // Use innerHTML to render the spans for highlighting
    if (isDeleting) {
        // Remove characters (less relevant if not looping, but keep logic)
        // This part needs careful handling if deleting HTML tags
        // For simplicity, if deleting is enabled, it might break HTML tags.
        // Since we stop after typing once, this part is less critical.
        animatedElement.innerHTML = textToType.substring(0, i - 1);
        i--;
        typingSpeed = 50;
    } else {
        // Add characters
        animatedElement.innerHTML = textToType.substring(0, i + 1);
        i++;
        typingSpeed = 60;
    }

    // If word is fully typed
    if (!isDeleting && i === textToType.length) {
        // Pause at end
        typingSpeed = 2000; // Pause briefly
        // isDeleting = true; // Uncomment to make it delete and retype (might break HTML)
        // Stop after typing once for portfolio
        return;
    }
    // If word is fully deleted (optional, if looping)
    // else if (isDeleting && i === 0) {
    //     isDeleting = false;
    //     // Move to next word or loop
    //     typingSpeed = 500;
    // }

    setTimeout(typeWriter, typingSpeed);
}

// Function to restart typing animation on language change
function restartTypewriter(lang) {
    if (!animatedElement || !originalTextKey) return;
    i = 0;
    isDeleting = false;
    animatedElement.innerHTML = ""; // Clear current text
    // Ensure the correct text key is used based on the new language
    currentTextKey = animatedElement.getAttribute("data-translate");
    // Small delay to allow content.js to update if needed
    setTimeout(typeWriter, 100);
}

// Initial call moved to main.js after DOM loaded and language set

