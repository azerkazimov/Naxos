//  on page load еру counters starts spinning
let values = document.querySelectorAll(".count-num");
let interval = 100;

values.forEach((value) => {
  let start = 0;
  let end = parseInt(value.getAttribute("data-val"));
  let duration = Math.floor(interval / end);
  let counter = setInterval(function () {
    start += 1;
    value.textContent = start;
    if (start >= end) {
      clearInterval(counter);
    }
  }, duration);
});
