let brand = document.querySelector(".client-slider-track");
let brandWidth = document.querySelector(".client-slider-pic").offsetWidth;
let brandChildren = [...brand.children];

// ============== Slider Mousemove ===============

let isDraggable = false,
  startFromX,
  startingScrollLeft,
  intervalId;

function dragStart(e) {
  isDraggable = true;
  brand.classList.add("dragging");

  startFromX = e.pageX;
  startingScrollLeft = brand.scrollLeft;
}

function dragging(e) {
  if (!isDraggable) return;
  brand.scrollLeft = startingScrollLeft - (e.pageX - startFromX);
}

function dragStop() {
  isDraggable = false;
  brand.classList.remove("dragging");
}

// ============ Clone Classes for Infinite Scroll =============
function cloneAndInsert(element, position) {
  let clonedCard = element.cloneNode(true);
  brand.insertAdjacentElement(position, clonedCard);
}

let brandPerView = Math.round(brand.offsetWidth / brandWidth);

// Clone cards at the beginning and end
function cloneCards() {
  // Clone cards at the beginning
  brandChildren
    .slice(-brandPerView)
    .reverse()
    .forEach((card) => {
      cloneAndInsert(card, "afterbegin");
    });

  // Clone cards at the end
  brandChildren.slice(0, brandPerView).forEach((card) => {
    cloneAndInsert(card, "beforeend");
  });
}

cloneCards();

// =========== Infinite Scroll =================
function infiniteScroll() {
  const { scrollLeft, scrollWidth, offsetWidth } = brand;

  if (scrollLeft === 0) {
    brand.classList.add("no-transition");
    brand.scrollLeft = scrollWidth - 2 * offsetWidth;
    brand.classList.remove("no-transition");
  } else if (Math.ceil(scrollLeft) === scrollWidth - offsetWidth) {
    brand.classList.add("no-transition");
    brand.scrollLeft = offsetWidth;
    brand.classList.remove("no-transition");
  }
}

// =============== Autoplay =================

function autoPlay() {
  intervalId = setInterval(() => {
    brand.scrollLeft += brandWidth;
  }, 2500);
}

autoPlay();

brand.addEventListener("mousemove", dragging);
brand.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
brand.addEventListener("scroll", infiniteScroll);
