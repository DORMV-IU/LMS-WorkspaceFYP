"use strict";

// console.log("duga");
const auth = firebase.auth();

const loginBtn = document.getElementById("loginBtn");
const testName = document.getElementById("testName");

const provider = new firebase.auth.GoogleAuthProvider();

// loginBtn.addEventListener("click", () => {
//   auth.signInWithPopup(provider);
// });

const googleLogin = () => {
  auth.signInWithPopup(provider);
};

auth.onAuthStateChanged((user) => {
  //state change monitor
  if (user) {
    // //signed in
    window.location.href = "./dashboard.html";
    console.log("signed in");
  } else {
    // //not signed in
    window.location.href = "./index.html";
  }
});
