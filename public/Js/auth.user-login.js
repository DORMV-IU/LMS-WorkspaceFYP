//COLLECT LOGIN DATA
const loginForm = document.querySelectorAll(".loginBox");
const loginEmail = document.querySelectorAll("input[type=email][name=id]");
const loginPwd = document.querySelectorAll("input[type=password][name=pwd]");

//LOGIN USER !!SEPERATION!!
loginForm.forEach((login, i) => {
  login.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginEmail[i].value;
    const password = loginPwd[i].value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        console.log(cred);
        login.style.border = "none";
      })
      .catch((error) => {
        alert(`ERROR || Invalid Email or Password\nMessage${error.message}`);
        login.style.border = "2px solid red";
        login.reset();
      });
  });
});
