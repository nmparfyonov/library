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
        );
    });
    document.addEventListener("click", (event) => {
        if (!hamburgerMenu.contains(event.target) && !navMenu.contains(event.target)) {
            hamburgerMenu.classList.remove("menu-active");
            navMenu.classList.remove("menu-active");
        }
        if (!profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.remove("menu-active");
        }
    });

    const profileButton = document.querySelector(".profile");
    const profileMenu = document.querySelector(".profile-menu");

    profileButton.addEventListener("click", () => {
        profileMenu.classList.toggle("menu-active");
    });

    const prevButton = document.getElementById("carret-left");
    const nextButton = document.getElementById("carret-right");
    const carouselImages = document.querySelector(".about-carousel-images");
    const radioButtons = document.querySelectorAll('input[name="pagination"]');
    let currentIndex = 0;

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % carouselImages.children.length;
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + carouselImages.children.length) % carouselImages.children.length;
        updateCarousel();
    });

    radioButtons.forEach((radio, index) => {
        radio.addEventListener("change", () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    function updateCarousel() {
        const offset = -currentIndex * 475;
        carouselImages.style.transform = `translateX(${offset}px)`;
        radioButtons[currentIndex].checked = true;
        [...radioButtons].map((button, index) => index === currentIndex ? button.disabled = true : button.disabled = false);
        nextButton.disabled = currentIndex === carouselImages.children.length - 1 ? true : false;
        prevButton.disabled = currentIndex === 0 ? true : false;
    }

    const seasonButtons = document.querySelectorAll('input[name="season"]');
    const seasons = document.querySelectorAll('.season-books');
    let seasonPageIndex = 0;
    seasonButtons.forEach((radio, index) => {
        radio.addEventListener("change", () => {
            hideBooks();
            seasonPageIndex = index;
            showBooks();
        });
    });

    function showBooks() {
        seasons[seasonPageIndex].classList.add('show');
    }
    function hideBooks() {
        seasons[seasonPageIndex].classList.remove('show');
    }

    const registerButtons = document.querySelectorAll('button[name="register"]');
    const registerModal = document.querySelector('.form-modal-background');
    const authModal = document.querySelector('.auth-modal');
    const closeRegisterModal = document.querySelector('.close-modal');
    registerButtons.forEach((button) => {
        button.addEventListener("click", () => {
            registerModal.classList.add("show");
            profileMenu.classList.remove("menu-active");
        });
    });
    registerModal.addEventListener("click", (event) => {
        if (!authModal.contains(event.target)) {
            registerModal.classList.remove("show");
        }
    });
    closeRegisterModal.addEventListener("click", () => {
        registerModal.classList.remove("show");
    });
});


