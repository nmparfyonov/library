document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav");
    const navItem = document.querySelectorAll(".nav li");

    hamburgerMenu.addEventListener("click", () => {
        navMenu.classList.toggle("menu-active");
        hamburgerMenu.classList.toggle("menu-active");
    });

    navItem.forEach((x) => {
        x.addEventListener("click", () => {
            navMenu.classList.toggle("menu-active");
            hamburgerMenu.classList.toggle("menu-active");
        }
        )
    });


});
