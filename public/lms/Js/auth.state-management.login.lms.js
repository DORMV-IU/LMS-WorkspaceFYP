const userImageRef = storageRef.child("users/profile_images");

auth.onAuthStateChanged((user) => {
  if (user) {
    //store user data for later use in session storage
    db.collection("users")
      .doc(user.email)
      .get()
      .then((doc) => {
        sessionStorage.setItem("accountType", doc.data().accountType);
        alert(sessionStorage.accountType);
        sessionStorage.fullName =
          doc.data().accountTypeData.firstName +
          " " +
          doc.data().accountTypeData.lasttName;
        sessionStorage.setItem("userEmail", user.email);

        userImageRef
          .child(`${user.email}/profile.jpg`)
          .getDownloadURL()
          .then(function (url) {
            sessionStorage.userImageUrl = url;
            window.location.href = "./HTML/landing.html";
          })
          .catch((err) => {
            switch (err.code) {
              case "storage/object-not-found":
                // File doesn't exist
                console.log("File doesn't exist");
                break;
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                console.log(
                  "User doesn't have permission to access the object"
                );

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

        // console.log(doc.data());
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});
