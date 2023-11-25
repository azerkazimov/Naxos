// nav-bar header sticky on scroll
window.addEventListener("load", function () {
  const header = document.querySelector(".header");
  const logo = document.querySelector(".header-navbar-brand img");
  window.addEventListener("scroll", function () {
    const burgerMenu = this.document.querySelector(".burger-menu-bar");
    header.classList.toggle("sticky", window.scrollY > 10);

    if (header.classList.contains("sticky")) {
      logo.src = "images/logo.png";
    } else {
      logo.src = "images/logo-white.png";
    }
  });
});

//   Burger Menu
const burger = document.querySelector(".burger-menu");
const mobileMenu = document.querySelector(".mobile-nav");

burger.addEventListener("click", function () {
  burger.classList.toggle("is-active");
  mobileMenu.classList.toggle("is-active");
});

// Search page activate
const search = document.querySelector(".search-option");
const searchCloseBtn = document.querySelector(".search-close-btn");
const searchContainer = document.querySelector(".search-line");

search.addEventListener("click", () => {
  searchContainer.classList.add("search-active");
});
searchCloseBtn.addEventListener("click", () => {
  searchContainer.classList.remove("search-active");
});


// Subscribe confirm
document.addEventListener("click", function () {
  let subscribeForm = document.getElementById("subscribe-form");
  let subscribeResult = document.querySelector(".subscribe-result");

  subscribeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let emailInput = document.querySelector('input[name="email"]').value;

    if (emailInput.includes("@")) {
      subscribeResult.parentElement.classList.add("show-result");
    } else {
      console.log("Invalid email");
    }
  });
});
