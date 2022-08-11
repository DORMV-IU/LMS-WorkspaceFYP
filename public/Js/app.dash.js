const username = document.querySelector(".username");
const userNameFirst = document.querySelector(".firstName");
const userNameLast = document.querySelector(".lastName");
const logout = document.querySelector("#logOut");
const userImageRef = storageRef.child("users/profile_images");

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
    .doc(user.email)
    .get()
    .then((doc) => {
      username.innerHTML = `${doc.data().accountTypeData.firstName}`;
      userNameFirst.innerHTML = `${doc.data().accountTypeData.firstName}`;
      userNameLast.innerHTML = `${doc.data().accountTypeData.lasttName}`;
      // console.log(doc.data());
    })
    .catch((err) => {
      console.log(err.message);
    });

  userImageRef
    .child(`${user.email}/profile.jpg`)
    .getDownloadURL()
    .then(function (url) {
      document.querySelector(".userImage").src = url;
    })
    .catch((err) => {
      switch (err.code) {
        case "storage/object-not-found":
          // File doesn't exist
          console.log("File doesn't exist");
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log("User doesn't have permission to access the object");

          break;
        case "storage/canceled":
          // User canceled the upload
          console.log("User canceled the upload");
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    });
}
