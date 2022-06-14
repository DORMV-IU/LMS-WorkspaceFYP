//INITIALIZATIONS
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

//Update firestore settings (how timestamps will work with firestore)
db.settings({ timestampsInSnapshots: true });

let loggedLocationOut = "../index.html";
