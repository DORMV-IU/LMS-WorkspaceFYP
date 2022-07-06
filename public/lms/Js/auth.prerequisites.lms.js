//INITIALIZATIONS
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();

//Update firestore settings (how timestamps will work with firestore)
db.settings({ timestampsInSnapshots: true });
