document.addEventListener("DOMContentLoaded", () => {
    // Initialize language on load
    const initialLang = localStorage.getItem("language") || "en"; // Default to English
    setLanguage(initialLang);

    // Initialize theme on load (already handled in theme-toggle.js, but ensure body class is set)
    const initialTheme = localStorage.getItem("theme") || "dark";
    applyTheme(initialTheme);

    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize Typing Animation (after language is set)
    if (typeof typeWriter === "function") {
        // Small delay to ensure content is potentially loaded
        setTimeout(typeWriter, 150);
    }

    // Add smooth scrolling for navigation links
    document.querySelectorAll("nav a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Active Navigation Link Highlighting on Scroll
    const navLinks = document.querySelectorAll(".nav-link");
    const sectionsForNav = document.querySelectorAll(".section"); // Use the same sections as scroll animation

    const navObserverOptions = {
        root: null,
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle 50% of viewport
        threshold: 0 // Trigger as soon as any part enters/leaves the middle zone
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${entry.target.id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, navObserverOptions);

    sectionsForNav.forEach(section => {
        navObserver.observe(section);
    });

    // Header shadow on scroll
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Update Lucide icons on theme/language change (if needed, handled by re-rendering or specific JS)
    // Example: Update theme toggle icon explicitly
    const themeBtn = document.getElementById("theme-toggle-btn");
    const updateThemeIcon = (theme) => {
        const iconName = theme === "dark" ? "sun" : "moon";
        if (themeBtn) {
            themeBtn.innerHTML = ";" // Clear existing icon
            const iconElement = document.createElement("i");
            iconElement.setAttribute("data-lucide", iconName);
            themeBtn.appendChild(iconElement);
            lucide.createIcons({ nodes: [iconElement] }); // Re-render just this icon
        }
    };
    // Initial theme icon set
    updateThemeIcon(initialTheme);
    // Add listener to update icon when theme changes (needs modification in theme-toggle.js or here)
    // Modification in theme-toggle.js: Call updateThemeIcon(currentTheme) inside applyTheme

    // Ensure lang-toggle.js calls restartTypewriter if it exists
    // Modification in lang-toggle.js: Add `if (typeof restartTypewriter === "function") { restartTypewriter(newLang); }` inside setLanguage

});

// Modify theme-toggle.js applyTheme function to update icon
/*
const applyTheme = (theme) => {
    // ... existing code ...
    updateThemeIcon(theme); // Call the function from main.js or define it here
};
*/

// Modify lang-toggle.js setLanguage function to restart typewriter
/*
const setLanguage = (lang) => {
    // ... existing code ...
    if (typeof restartTypewriter === "function") {
        restartTypewriter(lang);
    }
    localStorage.setItem("language", lang);
};
*/

