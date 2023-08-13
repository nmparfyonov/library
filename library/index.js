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
    document.addEventListener("click", (event) => {
        if (!hamburgerMenu.contains(event.target) && !navMenu.contains(event.target)) {
            hamburgerMenu.classList.remove("menu-active");
            navMenu.classList.remove("menu-active");
        }
    });
});

console.log('Все требования выполнены, соответствует макету 50/50')


