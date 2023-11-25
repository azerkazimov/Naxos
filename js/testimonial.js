let userTexts = document.querySelectorAll(".testimonial-single-box");
let userPics = document.querySelectorAll(".user-pic");
let userInfo = document.querySelectorAll(".user-info");
let carousel = document.querySelector(".testimonial-clients-track");
let cardWidth = document.querySelector(".testimonial-client-pic").offsetWidth;
let carouselChildren = [...carousel.children];

// ================ Show user review =========================
userPics.forEach((userPic, index) => {
  userPic.addEventListener("click", () => showReview(index));
});

function showReview(index) {
  userPics.forEach((userPic) => {
    userPic.classList.remove("active-pic");
  });

  userTexts.forEach((userText) => {
    userText.classList.remove("active-text");
  });

  userInfo.forEach((info) => {
    info.classList.remove("active-info");
  });

  userPics[index].classList.add("active-pic");
  userTexts[index].classList.add("active-text");
  userInfo[index].classList.add("active-info");
}

// ============== slider mousemove ===============

let isDrag = false,
  startX,
  startScrollLeft,
  timeoutId;

function dragStart(e) {
  isDrag = true;
  carousel.classList.add("dragging");

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
  if (!isDrag) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

function dragStop() {
  isDrag = false;
  carousel.classList.remove("dragging");
}

// ============ Clone classes for infinite scroll =============
let cardPerView = Math.round(carousel.offsetWidth / cardWidth);

// Clone cards at the beginning
carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    let clonedCard = card.cloneNode(true);
    carousel.insertAdjacentElement("afterbegin", clonedCard);
  });

// Clone cards at the end
carouselChildren.slice(0, cardPerView).forEach((card) => {
  let clonedCard = card.cloneNode(true);
  clonedCard.querySelectorAll("*").forEach((child) => {
    child.classList.remove("active-pic");
    child.classList.remove("active-info");
  });
  carousel.insertAdjacentElement("beforeend", clonedCard);
});

// =============== autoplay =================

function autoPlay() {
  // if (window.innerWidth < 800) return;
  timeoutId = setInterval(() => {
    carousel.scrollLeft += cardWidth;
  }, 2500);
}
autoPlay();

// =========== infinite scroll =================
function infiniteScroll() {
  const { scrollLeft, scrollWidth, offsetWidth } = carousel;
  if (scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = scrollWidth - 2 * offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (Math.ceil(scrollLeft) >= scrollWidth - offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = offsetWidth;
    carousel.classList.remove("no-transition");
  }
}

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
