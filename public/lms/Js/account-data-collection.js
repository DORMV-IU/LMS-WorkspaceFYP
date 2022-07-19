auth.onAuthStateChanged((user) => {
  db.collection("users")
    .doc(user.email)
    .get()
    .then((userdata) => {
      if (userdata) {
        document.querySelector(".uid").innerHTML = user.uid;
        document.querySelector(".firstName").innerHTML =
          userdata.data().accountTypeData.firstName;
        document.querySelector(".userWelcomeFirstName").innerHTML =
          userdata.data().accountTypeData.firstName;
        document.querySelector(".middleName").innerHTML =
          userdata.data().accountTypeData.middleName;
        document.querySelector(".lastName").innerHTML =
          userdata.data().accountTypeData.lasttName;
        document.querySelector(".id").innerHTML =
          userdata.data().accountTypeData.identificationNumber;
        document.querySelector(".accountType").innerHTML =
          userdata.data().accountType;
        document.querySelector(".email").innerHTML = user.email;
        document.querySelector(".mobile").innerHTML =
          userdata.data().accountTypeData.phone;
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error.message);
    });
});
