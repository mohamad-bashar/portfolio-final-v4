const themeToggleButton = document.getElementById("theme-toggle-btn");
const body = document.body;

// Function to update the theme toggle button icon (ensure this is accessible or defined)
const updateThemeIcon = (theme) => {
    const iconName = theme === "dark" ? "sun" : "moon";
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
        themeBtn.innerHTML = ""; // Clear existing icon
        const iconElement = document.createElement("i");
        iconElement.setAttribute("data-lucide", iconName);
        themeBtn.appendChild(iconElement);
        // Ensure lucide icons are re-rendered if not handled globally
        if (typeof lucide !== "undefined") {
            lucide.createIcons({ nodes: [iconElement] });
        }
    }
};

// Function to apply theme based on preference
const applyTheme = (theme) => {
    if (theme === "dark") {
        body.classList.add("dark-theme");
        body.classList.remove("light-theme"); // Ensure light theme is removed
    } else {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme"); // Ensure light theme is added
    }
    updateThemeIcon(theme); // Update the icon based on the applied theme
};

// Function to toggle theme
const toggleTheme = () => {
    // Check current theme based on class presence
    const currentThemeIsDark = body.classList.contains("dark-theme");
    const newTheme = currentThemeIsDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
};

// Check local storage for saved theme on initial load - Initial application moved to main.js
// const savedTheme = localStorage.getItem("theme") || "dark";
// applyTheme(savedTheme);

// Add event listener to the button
if (themeToggleButton) {
    themeToggleButton.addEventListener("click", toggleTheme);
} else {
    console.error("Theme toggle button not found!");
}

