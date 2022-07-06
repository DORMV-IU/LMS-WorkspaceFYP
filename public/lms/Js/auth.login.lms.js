//COLLECT LOGIN DATA
const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("input[type=email][name=id]");
const loginPwd = document.querySelector("input[type=password][name=pwd]");

//LOGIN USER !!SEPERATION!!
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPwd.value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      loginForm.reset();
      sessionStorage.UserID = cred.user.uid;
      loginForm.style.border = "1px solid var(--whiteDim)";
    })
    .catch((error) => {
      alert(`ERROR || Invalid Email or Password\nMessage${error.message}`);
      loginForm.style.border = "1px solid red";
      loginForm.reset();
    });
});
