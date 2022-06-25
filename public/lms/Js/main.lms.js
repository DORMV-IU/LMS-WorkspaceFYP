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
const homeBtn = document.querySelector("#homeBtn");
const createCourses = document.querySelector("#createCourses");

let pageHistory;

//PAGE CHANGE LISTENERS
userCoursesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userCoursesBtn.classList.add("active");
  homeBtn.classList.remove("active");
  createCourses.classList.remove("active");
  changePage("#homePage", "#userCourses", ".extra");
});

homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userCoursesBtn.classList.remove("active");
  homeBtn.classList.add("active");
  createCourses.classList.remove("active");
  changePage("#userCourses", "#homePage", ".extra");
});

const ftPosition = content[0].offsetTop;
const acPosition = allCourses.offsetTop;

// CHANGE PAGES
function changePage(previous, present, extra) {
  pageHistory = previous; //Track Previously Displayed Page
  console.log(pageHistory);
  document.querySelector(`${previous}`).style.display = "none";
  document.querySelector(`${present}`).style.display = "block";
  if (extra !== "") {
    document.querySelectorAll(`${extra}`).forEach((ex) => {
      ex.style.display = "none";
    });
  }
  // console.log(present, previous);
}

ftBtn.addEventListener("click", (e) => {
  e.preventDefault();
  content[0].scrollTo({
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
  content[0].scrollTo({
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
  content[0].scrollTo({
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
  content[0].scrollTo({
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
