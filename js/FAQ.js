// Show FAQ content on click
let faqs = document.querySelectorAll(".faq-container");

faqs.forEach((faq) => {
  faq.addEventListener("click", (e) => {
    e.preventDefault()
    // Remove active classes from all FAQ containers
    faqs.forEach((closeFaq) => {
      if (closeFaq !== faq) {
        closeFaq.classList.remove("faq-active");
        closeFaq.querySelector(".faq-question").classList.remove("active-question");
      }
    });

    faq.classList.toggle("faq-active");
    faq.querySelector(".faq-question").classList.toggle("active-question");
  });
});
