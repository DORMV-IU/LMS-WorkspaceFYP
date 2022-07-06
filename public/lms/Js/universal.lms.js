const content = document.querySelectorAll(".content-scroll");
const closeBtn = document.querySelectorAll(".closeBtn");
const modalBody = document.querySelectorAll(".modalBody");
const backToTop = document.querySelectorAll(".backToTop");
const modal_background = document.querySelectorAll(".modal_background");
const modalOpen = document.querySelectorAll(".modal-open");
const signOutBtn = document.querySelector("#signOutBtn");

//SETUP GENERAL USER INFO
document.querySelector(
  ".userImage"
).innerHTML = `<img src="${sessionStorage.userImageUrl}" alt="" />`;
userFirstNameDisplay = document.querySelectorAll(".userFirstName");

userFirstNameDisplay.forEach((name) => {
  name.textContent = sessionStorage.fullName;
});

const screenWatcher = () => {
  if (window.innerWidth < 1000) {
    document.querySelector(".desktopMode").style.display = "none";
    document.querySelector(".notDesktopMode").style.display = "block";
  } else {
    document.querySelector(".desktopMode").style.display = "block";
    document.querySelector(".notDesktopMode").style.display = "none";
  }
};

window.addEventListener("resize", screenWatcher);

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

backToTop.forEach((top, i) => {
  top.addEventListener("click", (e) => {
    e.preventDefault();
    content[i].scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

//SIGN OUT
signOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

document.addEventListener("DOMContentLoaded", screenWatcher);
