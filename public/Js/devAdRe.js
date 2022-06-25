"use strict";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Random character generator//
function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    if (i === 3 || i === 7) {
      result += "-";
    }
  }

  const dbKey = db
    .collection("adminKeys")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        return doc.data().key;
      });
    });

  for (let i = 0; i < dbKey.length; i++) {
    if (dbKey[i] === result) {
      return generateString(length);
    }
  }

  return result;
}

document.querySelector("#genKey").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#genKeyInput").value = `${generateString(12)}`;
});

studentRadio.addEventListener("change", () => {
  isChecked();
});

personnelRadio.addEventListener("change", () => {
  isChecked();
});

adminRadio.addEventListener("change", () => {
  isChecked();
});
