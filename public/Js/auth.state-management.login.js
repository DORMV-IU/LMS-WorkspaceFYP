auth.onAuthStateChanged((user) => {
  if (user) {
    alert("Logged In");

    //COLLECT DATA FROM THE USERS COLLECTION
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(
        (doc) => {
          displayDash(doc.data().accountType);
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
});

const displayDash = (type) => {
  console.log(type);
  if (type === "student") {
    window.location.href = "../HTML/student.dash.html";
  } else if (type === "personnel") {
    window.location.href = "../HTML/personnel.dash.html";
  } else if (type === "admin") {
    window.location.href = "../HTML/admin.dash.html";
  }
};
