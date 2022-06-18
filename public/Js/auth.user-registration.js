// COLLECT SIGNUP DATA
const registrationForm = document.querySelector("#devAdRe");
const regBtn = document.querySelector("#regBtn");
const regEmail = document.querySelector("#regEmail");
const regPwd = document.querySelector("#regPwd");
const confirm_password = document.getElementById("conpwd");
const fileInput = document.querySelector("#userPhoto");
const userImageRef = storageRef.child("users/profile_images");

// REGISTER USER !!SEPERATION!!
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault(); //PREVENT AUTO-REFRESH
  const isValid = validatePassword(); //CHECK PASSWORD VALIDITY

  if (isValid) {
    const email = regEmail.value;
    const password = regPwd.value;

    const typeOfAccount = document.querySelector(
      "input[type=radio][name=account_type]:checked"
    ).value;

    let accountTypeData = {};

    if (typeOfAccount === "student") {
      accountTypeData = {
        firstName: document.querySelector("#studentNameFirst").value,
        middleName: document.querySelector("#studentNameMiddle").value,
        lasttName: document.querySelector("#studentNameLast").value,
        phone: document.querySelector("#studentPhone").value,
        department: document.querySelector("#studentDepartment").value,
        identificationNumber: document.querySelector(
          "#studentIdentificationNumber"
        ).value,
      };
    } else if (typeOfAccount === "personnel") {
      accountTypeData = {
        firstName: document.querySelector("#personnelNameFirst").value,
        middleName: document.querySelector("#personnelNameMiddle").value,
        lasttName: document.querySelector("#personnelNameLast").value,
        phone: document.querySelector("#personnelPhone").value,
        department: document.querySelector("#personnelDepartment").value,
        identificationNumber: document.querySelector(
          "#personnelIdentificationNumber"
        ).value,
      };
    } else {
      accountTypeData = {
        firstName: document.querySelector("#adminNameFirst").value,
        middleName: document.querySelector("#adminNameMiddle").value,
        lasttName: document.querySelector("#adminNameLast").value,
        phone: document.querySelector("#adminPhone").value,
        genKeyInput: document.querySelector("#genKeyInput").value,
      };
    }

    //REGISTER USER
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        // REGISTER SECONDARY USER DATA BASED ON ACCOUNT TYPE WITH THE GENERATED UID
        //COLLECTION: USERS

        //SAVE PROOFILE PICTURE
        const selectedFile = fileInput.files[0];
        let fileRef;

        if (selectedFile) {
          fileRef = userImageRef.child(`${credentials.user.uid}/profile.jpg`);
          fileRef.put(selectedFile).then(() => {
            userImageRef
              .child(`${credentials.user.uid}/profile.jpg`)
              .getDownloadURL()
              .then(function (url) {
                return db
                  .collection("users")
                  .doc(credentials.user.uid)
                  .set({
                    accountType: typeOfAccount,
                    accountTypeData: accountTypeData,
                    created: new Date().toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }),
                    profilePhotoUrl: url,
                  })
                  .then(() => {
                    if (typeOfAccount === "admin") {
                      return db
                        .collection("adminKeys")
                        .doc(credentials.user.id)
                        .set({
                          key: document.querySelector("#genKeyInput").value,
                        })
                        .then(() => {
                          document.querySelector("form").reset();
                        });
                    } else {
                      document.querySelector("form").reset();
                      auth.signOut();
                    }
                  });
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
          });
        } else {
          fileRef = "";
        }
      })
      .then(() => {
        alert(`User Registered Successfully`);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
});

//PASSWORD VALIDATION !!SEPERATION!!
function validatePassword() {
  let pass;
  if (regPwd.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
    pass = false;
  } else {
    confirm_password.setCustomValidity("");
    pass = true;
  }

  if (regPwd.value.length < 6) {
    regPwd.setCustomValidity("Password length must be over 6");
    pass = false;
  } else {
    regPwd.setCustomValidity("");
    pass = true;
  }

  return pass;
}

regPwd.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
