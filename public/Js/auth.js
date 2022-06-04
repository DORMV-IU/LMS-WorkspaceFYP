"use strict";
const auth = firebase.auth();
const loginBtn = document.getElementById("loginBtn");

const provider = new firebase.auth.GoogleAuthProvider();

// loginBtn.addEventListener("click", () => {
//   auth.signInWithPopup(provider);
// });

const googleLogin = () => {
  auth.signInWithPopup(provider);
};
