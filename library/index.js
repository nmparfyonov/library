document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav");

    hamburgerMenu.addEventListener("click", () => {
        navMenu.classList.toggle("menu-active");
        hamburgerMenu.classList.toggle("menu-active");
    });


});
