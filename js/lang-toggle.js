const langToggleButton = document.getElementById("lang-toggle-btn");
const translatableElements = document.querySelectorAll("[data-translate]");
const htmlElement = document.documentElement;

// Function to set language
const setLanguage = (lang) => {
    htmlElement.setAttribute("lang", lang);
    htmlElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    // Update button title
    if (langToggleButton) {
        langToggleButton.title = lang === "en" ? "Switch to Arabic" : "Switch to English";
    }

    translatableElements.forEach(element => {
        const key = element.getAttribute("data-translate");
        // Check if siteContent exists and has the language and key
        if (typeof siteContent !== "undefined" && siteContent[lang] && siteContent[lang][key]) {
            // Use innerHTML to allow rendering of embedded spans (like highlight-keyword)
            element.innerHTML = siteContent[lang][key];
        }
    });

    localStorage.setItem("language", lang);

    // Restart typewriter animation if it exists
    if (typeof restartTypewriter === "function") {
        restartTypewriter(lang);
    }

    // Re-initialize Lucide icons after content update, especially if icons are within translated elements
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
};

// Function to toggle language
const toggleLanguage = () => {
    const currentLang = localStorage.getItem("language") || "en";
    const newLang = currentLang === "en" ? "ar" : "en";
    setLanguage(newLang);
};

// Check local storage for saved language on initial load - Initial setLanguage call moved to main.js

// Add event listener
if (langToggleButton) {
    langToggleButton.addEventListener("click", toggleLanguage);
} else {
    console.error("Language toggle button not found!");
}

