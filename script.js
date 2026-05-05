document.addEventListener('DOMContentLoaded', () => {
    
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sideMenu = document.getElementById('sideMenu');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const header = document.getElementById('mainHeader');

    // Menu Controls
    menuBtn.addEventListener('click', () => sideMenu.classList.add('active'));
    closeBtn.addEventListener('click', () => sideMenu.classList.remove('active'));

    // Search Logic
    const triggerSearch = () => {
        const query = searchInput.value.trim();
        if (query !== "") {
            alert("Searching FLUX for: " + query);
        }
    };

    searchBtn.addEventListener('click', triggerSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') triggerSearch();
    });

    // Scroll Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.padding = "0.6rem 5%";
            header.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
        } else {
            header.style.padding = "1rem 5%";
            header.style.backgroundColor = "#000";
        }
    });

});
