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
        console.log(currentIndex)
        if (currentIndex === carouselImages.children.length-1) {
            nextButton.disabled = true
            prevButton.disabled = false
        } else if (currentIndex === 0) {
            prevButton.disabled = true
            nextButton.disabled = false
        } else {
            nextButton.disabled = false
            prevButton.disabled = false
        }
    }
});


