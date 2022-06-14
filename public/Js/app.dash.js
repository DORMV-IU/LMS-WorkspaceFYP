const username = document.querySelector(".username");
const logout = document.querySelector("#logOut");

//SETUP DISPLAY FUNCTIONS WITH AUTH STATE
auth.onAuthStateChanged((user) => {
  displayUserInfo(user);
});

logout.addEventListener("click", () => {
  alert("Logged Out");
  auth.signOut();
});

function displayUserInfo(user) {
  db.collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      username.innerHTML = `Welcome, <span style = "color: #6ec058; font-weight: bold;">${
        doc.data().accountTypeData.firstName
      }</span>`;
      console.log(doc.data());
    })
    .catch((err) => {
      console.log(err.message);
    });
}
