"use strict";

// PASSWORD VALIDITY CHECK
const password = document.getElementById("pwd"),
  confirm_password = document.getElementById("conpwd"),
  RegisterForm = document.getElementById("regForm");

const studentRadio = document.querySelector("#student"),
  personnelRadio = document.querySelector("#personnel"),
  adminRadio = document.querySelector("#admin"),
  studentField = document.querySelector("#student-field"),
  personnelField = document.querySelector("#personnel-field"),
  adminField = document.querySelector("#admin-field");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Random character generator//
function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    if (i === 3 || i === 7) {
      result += "-";
    }
  }

  return result;
}

RegisterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validatePassword();
});

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity("");
  }

  if (password.value.length < 6) {
    password.setCustomValidity("Password length must be over 6");
  } else {
    password.setCustomValidity("");
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

//SWITCH ACOUNT TYPE BASED ON CHECKED RADIO
const isChecked = () => {
  if (studentRadio.checked) {
    //display elements
    studentField.style.display = "block";
    personnelField.style.display = "none";
    adminField.style.display = "none";

    //disable elements
    studentField.disbled = false;
    personnelField.disbled = true;
    adminField.disbled = true;
  } else if (personnelRadio.checked) {
    //display elements
    studentField.style.display = "none";
    personnelField.style.display = "block";
    adminField.style.display = "none";

    //disable elements
    studentField.disbled = true;
    personnelField.disbled = false;
    adminField.disbled = true;
  } else if (adminRadio.checked) {
    //display elements
    studentField.style.display = "none";
    personnelField.style.display = "none";
    adminField.style.display = "block";

    //disable elements
    studentField.disbled = true;
    personnelField.disbled = true;
    adminField.disbled = false;
  }
};

studentRadio.addEventListener("change", () => {
  isChecked();
});
adminRadio.addEventListener("change", () => {
  isChecked();
});
personnelRadio.addEventListener("change", () => {
  isChecked();
});

isChecked();

document.querySelector("#genKey").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#genKeyInput").value = `${generateString(12)}`;
});
