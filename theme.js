function setTheme(themeName) {
    // This applies the theme to the <body> tag
    document.body.setAttribute('data-theme', themeName);
    // This saves it so it stays when you change pages
    localStorage.setItem('libraryTheme', themeName);
}

// This part runs every time a new page loads
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('libraryTheme') || 'vintage';
    setTheme(savedTheme);
});