const content = document.querySelector(".content");
const closeBtn = document.querySelectorAll(".closeBtn");
const modalBody = document.querySelectorAll(".modalBody");
const backToTop = document.querySelector(".backToTop");
const modal_background = document.querySelectorAll(".modal_background");
const modalOpen = document.querySelectorAll(".modal-open");

window.addEventListener("resize", (e) => {
  if (window.innerWidth < 1000) {
    document.querySelector(".desktopMode").style.display = "none";
    document.querySelector(".notDesktopMode").style.display = "block";
  } else {
    document.querySelector(".desktopMode").style.display = "block";
    document.querySelector(".notDesktopMode").style.display = "none";
  }
});

// CLOSE MODAL
const closeModal = (close, i) => {
  close.preventDefault();
  modal_background[i].style.opacity = "0";
  modalBody[i].style.opacity = "0";
  modal_background[i].style.display = "none";
  modalBody[i].style.display = "none";
  modalOpen[i].classList.toggle("active");
};

closeBtn.forEach((close, i) => {
  close.addEventListener("click", (e) => {
    closeModal(e, i);
  });
});

modal_background.forEach((background, i) => {
  background.addEventListener("click", (e) => {
    closeModal(e, i);
  });
});

modalOpen.forEach((open, i) => {
  open.addEventListener("click", (e) => {
    e.preventDefault();
    modal_background[i].style.opacity = "1";
    modalBody[i].style.opacity = "1";
    modal_background[i].style.display = "block";
    modalBody[i].style.display = "block";
    modalOpen[i].classList.toggle("active");
  });
});

backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  content.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
