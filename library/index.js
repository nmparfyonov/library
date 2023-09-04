document.addEventListener("DOMContentLoaded", function () {
    const libraryCardGetSectionHeading = document.querySelector(".library-card-get-heading");
    const libraryCardGetSectionText = document.querySelector(".library-card-get-text");
    const libraryCardGetSectionButtons = document.querySelectorAll(".lcg-buttons");
    const libraryCardFindFormName = document.querySelector("#card-find-name");
    const libraryCardFindFormCardnumber = document.querySelector("#card-find-cardnumber");
    const changeLibraryCardSection = () => {
        libraryCardGetSectionButtons.forEach((button) => button.classList.toggle("hidden"));
        libraryCardGetSectionHeading.innerHTML = "Visit your profile";
        libraryCardGetSectionText.innerHTML = "With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.";
        const currentUser = JSON.parse(localStorage.getItem("users")).filter((user) => user.id === localStorage.getItem("authorized"))[0];
        libraryCardFindFormName.value = `${currentUser.data.name} ${currentUser.data.surname}`;
        libraryCardFindFormName.disabled = true;
        libraryCardFindFormCardnumber.value = `${currentUser.id}`;
        libraryCardFindFormCardnumber.disabled = true;
    };

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
        if (!profileAuthorizedButton.contains(event.target) && !profileAuthorizedMenu.contains(event.target)) {
            profileAuthorizedMenu.classList.remove("menu-active");
        }
    });

    const profileButton = document.querySelector(".profile");
    const profileMenu = document.querySelector(".profile-menu");

    profileButton.addEventListener("click", () => {
        profileMenu.classList.toggle("menu-active");
    });

    const profileAuthorizedButton = document.querySelector(".authorized-icon");
    const profileAuthorizedMenu = document.querySelector(".profile-menu-autorized");

    profileAuthorizedButton.addEventListener("click", () => {
        profileAuthorizedMenu.classList.toggle("menu-active");
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
    const registerModal = document.querySelector('#register-modal');
    const registerAuthModal = document.querySelector('#register-auth-modal');
    const closeRegisterModal = document.querySelector('#register-close-modal-button');
    const loginButtons = document.querySelectorAll('button[name="login"]');
    const loginModal = document.querySelector('#login-modal');
    const loginAuthModal = document.querySelector('#login-auth-modal');
    const closeLoginModal = document.querySelector('#login-close-modal-button');
    const switchAuthModals = document.querySelectorAll('.auth-footer-link');
    registerButtons.forEach((button) => {
        button.addEventListener("click", () => {
            registerModal.classList.add("show");
            profileMenu.classList.remove("menu-active");
        });
    });
    registerModal.addEventListener("click", (event) => {
        if (!registerAuthModal.contains(event.target)) {
            registerModal.classList.remove("show");
        }
    });
    closeRegisterModal.addEventListener("click", () => {
        registerModal.classList.remove("show");
    });
    loginButtons.forEach((button) => {
        button.addEventListener("click", () => {
            loginModal.classList.add("show");
            profileMenu.classList.remove("menu-active");
        });
    });
    loginModal.addEventListener("click", (event) => {
        if (!loginAuthModal.contains(event.target)) {
            loginModal.classList.remove("show");
        }
    });
    closeLoginModal.addEventListener("click", () => {
        loginModal.classList.remove("show");
    });
    switchAuthModals.forEach((link) => {
        link.addEventListener("click", () => {
            loginModal.classList.toggle("show");
            registerModal.classList.toggle("show");
        });
    });


    const showLoginModal = () => {
        loginModal.classList.add("show");
    };
    const buyBookButtons = document.querySelectorAll('.favorites-buy-book-button');
    buyBookButtons.forEach((button) => {
        button.addEventListener("click", showLoginModal);
    });

    const profileAuthorizedMenuHeading = profileAuthorizedMenu.querySelector(".profile-menu-heading-authorized");
    const profileIcon = document.querySelector(".authorized-icon");
    const email = registerAuthModal.querySelector('input[name="email"]');
    const name = registerAuthModal.querySelector('input[name="name"]');
    const surname = registerAuthModal.querySelector('input[name="surname"]');
    const password = registerAuthModal.querySelector('input[name="password"]');
    const registerSubmitForm = registerAuthModal.querySelector('.auth-modal-form');
    registerSubmitForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const cardNumber = getCardNumber();
        const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
        const currentCredentials = JSON.parse(localStorage.getItem('credentials')) || [];
        for (let i = 0; i < currentCredentials.length; i++) {
            if (email.value === currentCredentials[i].email) {
                return alert("User with this email already exists");
            }
        }
        currentUsers.push({
            "id": cardNumber,
            "data": {
                "email": email.value,
                "password": password.value,
                "name": name.value,
                "surname": surname.value,
                "cardnumber": cardNumber,
                "visits": 1,
                "subscription": false,
                "books": []
            }
        });
        currentCredentials.push({
            "id": cardNumber,
            "email": email.value,
            "password": password.value
        });
        localStorage.setItem("users", JSON.stringify(currentUsers));
        localStorage.setItem("credentials", JSON.stringify(currentCredentials));
        localStorage.setItem("authorized", cardNumber);
        profileIcon.value = name.value[0] + surname.value[0];
        profileIcon.title = `${name.value} ${surname.value}`;
        profileIcon.classList.remove("hidden");
        profileButton.classList.add("hidden");
        registerModal.classList.remove("show");
        profileAuthorizedMenuHeading.innerHTML = cardNumber;
        buyBookButtons.forEach((button) => {
            button.removeEventListener("click", showLoginModal);
        });
        changeLibraryCardSection();
    });
    const getCardNumber = () => {
        const timestamp = Date.now() + Math.round(Math.random() * 10);
        return timestamp.toString(16).slice(-9).toUpperCase();
    };

    const loginLogin = loginAuthModal.querySelector('input[name="login"]');
    const loginPassword = loginAuthModal.querySelector('input[name="password"]');
    const loginSubmitForm = loginAuthModal.querySelector('.auth-modal-form');
    loginSubmitForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const currentCredentials = JSON.parse(localStorage.getItem('credentials')) || [];
        const username = loginLogin.value;
        const password = loginPassword.value;
        for (let i = 0; i < currentCredentials.length; i++) {
            if (currentCredentials[i].id === username && currentCredentials[i].password === password || currentCredentials[i].email === username && currentCredentials[i].password === password) {
                localStorage.setItem("authorized", currentCredentials[i].id);
                const currentUser = JSON.parse(localStorage.getItem("users")).filter((user) => user.id === currentCredentials[i].id)[0];
                profileIcon.value = currentUser.data.name[0] + currentUser.data.surname[0];
                profileIcon.title = `${currentUser.data.name} ${currentUser.data.surname}`;
                profileIcon.classList.remove("hidden");
                profileButton.classList.add("hidden");
                loginModal.classList.remove("show");
                profileAuthorizedMenuHeading.innerHTML = currentUser.id;
                buyBookButtons.forEach((button) => {
                    button.removeEventListener("click", showLoginModal);
                });
                const allUsers = JSON.parse(localStorage.getItem("users"));
                allUsers.map((user) => {
                    if (user.id === currentUser.id) {
                        user.data.visits += 1;
                    }
                });
                localStorage.setItem("users", JSON.stringify(allUsers));
                changeLibraryCardSection();
            }
        }
        if (!localStorage.getItem('authorized')) {
            alert('Invalid login or password');
        }
    });
    const logoutButton = document.querySelector('button[name="logout"]');
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem('authorized');
        location.reload();
    });
    if (!!localStorage.getItem('authorized')) {
        const currentID = localStorage.getItem('authorized');
        const currentUser = JSON.parse(localStorage.getItem("users")).filter((user) => user.id === currentID)[0];
        profileIcon.value = currentUser.data.name[0] + currentUser.data.surname[0];
        profileIcon.title = `${currentUser.data.name} ${currentUser.data.surname}`;
        profileIcon.classList.remove("hidden");
        profileButton.classList.add("hidden");
        loginModal.classList.remove("show");
        profileAuthorizedMenuHeading.innerHTML = currentUser.id;
        buyBookButtons.forEach((button) => {
            button.removeEventListener("click", showLoginModal);
        });
        changeLibraryCardSection();
    }
});


