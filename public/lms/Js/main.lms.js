"use strict";
const ftBtn = document.querySelector("#ftBtn");
const acBtn = document.querySelector("#acBtn");
const csBtn = document.querySelector("#csBtn");
const featured = document.querySelector(".featured");
const allCourses = document.querySelector(".all-courses");
const comingSoon = document.querySelector("#coming-soon");
const learnMore = document.querySelector("#lm");

const ftPosition = content[0].offsetTop;
const acPosition = allCourses.offsetTop;

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
