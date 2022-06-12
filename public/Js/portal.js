const sisBox = document.querySelector("#sis");
const pmsBox = document.querySelector("#pms");

const sisBtn = document.querySelector("#sisShowBtn");
const pmsBtn = document.querySelector("#pmsShowBtn");

// !!SEPERATION!! SWITCH BETWEEN LOGIN FORMATS FOR PERSONNEL AND STUDENTS
pmsBtn.addEventListener("click", () => {
  sisBox.style.display = "none";
  pmsBox.style.display = "block";
  sisBtn.style.display = "block";
  pmsBtn.style.display = "none";
  document.title = "Login | Personnel Management System";
});

sisBtn.addEventListener("click", () => {
  pmsBox.style.display = "none";
  sisBox.style.display = "block";
  pmsBtn.style.display = "block";
  sisBtn.style.display = "none";
  document.title = "Login | Student Information System";
});
