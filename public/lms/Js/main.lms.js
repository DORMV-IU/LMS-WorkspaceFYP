"use strict";
const ftBtn = document.querySelector("#ftBtn");
const acBtn = document.querySelector("#acBtn");
const csBtn = document.querySelector("#csBtn");
const featured = document.querySelector(".featured");
const allCourses = document.querySelector(".all-courses");
const comingSoon = document.querySelector("#coming-soon");
const signOutBtn = document.querySelector("#signOutBtn");
const learnMore = document.querySelector("#lm");

const userCoursesBtn = document.querySelector("#userCoursesBtn");
userCoursesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  userCoursesBtn.classList.add(".active");
  changePage("homePage", "coursePage", "extra");
});

const ftPosition = content.offsetTop;
const acPosition = allCourses.offsetTop;

// CHANGE PAGES
function changePage(previous, present, extra) {
  document.querySelector(`#${previous}`).style.display = "none";
  document.querySelector(`#${present}`).style.display = "block";
  if (extra !== "") {
    document.querySelectorAll(`.${extra}`).forEach((ex) => {
      ex.style.display = "none";
    });
  }
  // console.log(present, previous);
}

ftBtn.addEventListener("click", (e) => {
  e.preventDefault();
  content.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  if (!ftBtn.classList.contains("active")) {
    ftBtn.classList.add("active");
    acBtn.classList.remove("active");
    csBtn.classList.remove("active");
  }
});

learnMore.addEventListener("click", (e) => {
  e.preventDefault();
  content.scrollTo({
    top: 400,
    behavior: "smooth",
  });
  if (!acBtn.classList.contains("active")) {
    ftBtn.classList.remove("active");
    acBtn.classList.add("active");
    csBtn.classList.remove("active");
  }
});

acBtn.addEventListener("click", (e) => {
  e.preventDefault();
  content.scrollTo({
    top: 400,
    behavior: "smooth",
  });
  if (!acBtn.classList.contains("active")) {
    ftBtn.classList.remove("active");
    acBtn.classList.add("active");
    csBtn.classList.remove("active");
  }
});

csBtn.addEventListener("click", (e) => {
  e.preventDefault();
  content.scrollTo({
    top: comingSoon.offsetTop - 100,
    behavior: "smooth",
  });
  if (!csBtn.classList.contains("active")) {
    ftBtn.classList.remove("active");
    acBtn.classList.remove("active");
    csBtn.classList.add("active");
  }
});

window.addEventListener("scroll", () => {
  if (window.screenY >= 400) {
    ftBtn.classList.remove("active");
    acBtn.classList.add("active");
    csBtn.classList.remove("active");
  } else if (window.screenY >= comingSoon.offsetTop - 75) {
    ftBtn.classList.remove("active");
    acBtn.classList.remove("active");
    csBtn.classList.add("active");
  } else {
    ftBtn.classList.add("active");
    acBtn.classList.remove("active");
    csBtn.classList.remove("active");
  }
});
