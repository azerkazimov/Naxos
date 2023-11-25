let track = document.querySelector(".screenshot-track");
let trackWidth = document.querySelector(".screenshot-picture").offsetWidth;
let trackChildren = [...track.children];
let dotsContainer = document.querySelector(".dots");
let currentSlide = 0;

// ============== Slider Mousemove ===============

let isDragging = false,
  startsX,
  startsScrollLeft,
  timeOutId;

function dragStart(e) {
  isDragging = true;
  track.classList.add("dragging");

  startsX = e.pageX;
  startsScrollLeft = track.scrollLeft;
}

function dragging(e) {
  if (!isDragging) return;
  track.scrollLeft = startsScrollLeft - (e.pageX - startsX);
}

function dragStop() {
  isDragging = false;
  track.classList.remove("dragging");
}

// ============ Clone Classes for Infinite Scroll =============

function cloneAndInsert(element, position) {
  let clonedCard = element.cloneNode(true);
  track.insertAdjacentElement(position, clonedCard);
}

let trackPerView = Math.round(track.offsetWidth / trackWidth);

// Clone cards at the beginning and end
function cloneCards() {
  // Clone cards at the beginning
  trackChildren
    .slice(-trackPerView)
    .reverse()
    .forEach((card) => {
      cloneAndInsert(card, "afterbegin");
    });

  // Clone cards at the end
  trackChildren.slice(0, trackPerView).forEach((card) => {
    cloneAndInsert(card, "beforeend");
  });
}

cloneCards();

// =============== Dots =================

// Function to create dots
function createDots() {
  for (let i = 0; i < trackChildren.length / 2; i++) {
    let dot = document.createElement("div");
    dot.classList.add("dot");
    dotsContainer.appendChild(dot);
  }
  dots = document.querySelectorAll(".dot");

  function scrollToSlide() {
    const targetScrollLeft = currentSlide * (trackWidth *2);
    track.scrollLeft = targetScrollLeft * 2;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateDots();
      scrollToSlide();
    });
  });

  updateDots();
}

// Function to update the active dot
function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active-dot", index === currentSlide);
  });
}

function updateCloneDot() {
  dotsContainer.innerHTML = "";
  createDots();
}

// =========== Infinite Scroll =================

function infiniteScroll() {
  const { scrollLeft, scrollWidth, offsetWidth } = track;

  if (scrollLeft === 0) {
    track.classList.add("no-transition");
    track.scrollLeft = scrollWidth - 2 * offsetWidth;
    track.classList.remove("no-transition");
    updateCloneDot();
  } else if (Math.ceil(scrollLeft) === scrollWidth - offsetWidth) {
    track.classList.add("no-transition");
    track.scrollLeft = offsetWidth;
    track.classList.remove("no-transition");
    updateCloneDot();
  }
}

// =============== Autoplay =================

function autoPlay() {
  timeOutId = setInterval(() => {
    track.scrollLeft += trackWidth;
  }, 2500);
}

// ============== Activate ====================

track.addEventListener("mousemove", dragging);
track.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
track.addEventListener("scroll", infiniteScroll);
createDots();
autoPlay();

// ===========================================
