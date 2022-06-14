auth.onAuthStateChanged((user) => {
  if (!user) {
    //COLLECT DATA FROM THE USERS COLLECTION
    window.location.href = "../index.html";
  }
});
