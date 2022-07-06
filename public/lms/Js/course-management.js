const tabBtn = document.querySelectorAll(".tabBtn");
const tab = document.querySelectorAll(".tab");
const formLeftBtn = document.querySelector("#form-left");
const pageNumber = document.querySelector(".pageNumber");
const formRightBtn = document.querySelector("#form-right");
const generalInfo = document.querySelector("#general-information");
const lectureInfo = document.querySelector("#lecture-information");

const loAddBtn = document.querySelector("#lo-add");
const loRemoveBtn = document.querySelector("#lo-remove");
const crAddBtn = document.querySelector("#cr-add");
const crRemoveBtn = document.querySelector("#cr-remove");
const learningObjectives = document.querySelector(".learning-objectives");
const courseRequirements = document.querySelector(".course-requirements");

const lectures = document.querySelector(".lectures");
const ltAddBtn = document.querySelector("#lt-add");
const ltRemoveBtn = document.querySelector("#lt-remove");

// const frAddBtn = document.querySelectorAll(".fr-add");
// const frRemoveBtn = document.querySelectorAll(".fr-remove");
// const fileResources = document.querySelectorAll(".file-resources");

tabBtn[0].addEventListener("click", (e) => {
  e.preventDefault();
  tabBtn[0].classList.add("active");
  tabBtn[1].classList.remove("active");
  tab[0].style.display = "flex";
  tab[1].style.display = "none";
  document.querySelector("#creation").reset();

  removeAddables();
});

tabBtn[1].addEventListener("click", (e) => {
  e.preventDefault();
  tabBtn[1].classList.add("active");
  tabBtn[0].classList.remove("active");
  tab[1].style.display = "flex";
  tab[0].style.display = "none";
});

formLeftBtn.addEventListener("click", (e) => {
  e.preventDefault();
  generalInfo.style.right = "0";
  lectureInfo.style.left = "100%";
  formLeftBtn.style.display = "none";
  formRightBtn.style.display = "block";
  pageNumber.innerHTML = "1";
});

formRightBtn.addEventListener("click", (e) => {
  e.preventDefault();
  generalInfo.style.right = "100%";
  lectureInfo.style.left = "0";
  formLeftBtn.style.display = "block";
  formRightBtn.style.display = "none";
  pageNumber.innerHTML = "2";
});

//ADDABLES
let loCount = 1;
let crCount = 1;
let ltCount = 1;
// let frCount = [[1, 1]];

//ADD LO
loAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loCount++;
  const lo = document.createElement("input");
  lo.setAttribute("type", "text");
  lo.setAttribute("id", `lo-${loCount}`);
  lo.setAttribute("required", "");
  lo.setAttribute("placeholder", "Learning Objective " + loCount);
  learningObjectives.appendChild(lo);

  if (loCount > 1) {
    loRemoveBtn.style.display = "block";
  }
});

//REMOVE LO
loRemoveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const lo = document.querySelector(`#lo-${loCount}`);
  lo.remove();
  loCount--;
  if (loCount < 2) {
    loRemoveBtn.style.display = "none";
  }
});

//ADD CR
crAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  crCount++;
  const cr = document.createElement("input");
  cr.setAttribute("type", "text");
  cr.setAttribute("id", `cr-${crCount}`);
  cr.setAttribute("required", "");
  cr.setAttribute("placeholder", "Course Requirement " + crCount);
  courseRequirements.appendChild(cr);

  if (crCount > 1) {
    crRemoveBtn.style.display = "block";
  }
});

//REMOVE CR
crRemoveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const cr = document.querySelector(`#cr-${crCount}`);
  cr.remove();
  crCount--;
  if (crCount < 2) {
    crRemoveBtn.style.display = "none";
  }
});

//ADD LT
ltAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ltCount++;
  // frCount.push([ltCount, 1]);
  const lt = document.createElement("div");
  lt.setAttribute("id", `lt-${ltCount}`);
  lt.classList.add("lecture");
  lt.innerHTML = `
                          <div class="lt-header">
                            <h3>#<span class="lt-number">${ltCount}</span></h3>
                            <input
                              type="text"
                              id="lt-${ltCount}-title"
                              placeholder="Lecture Title"
                            />
                          </div>

                          <label>Lecture Description</label>
                          <textarea id="lecture-${ltCount}-description"></textarea>

                          <label>Lecture Video File</label>
                          <input
                            type="file"
                            style="cursor: pointer"
                            id="lt-${ltCount}-video"
                            accept="video/*"
                            required
                          />
  `;
  lectures.appendChild(lt);

  if (ltCount > 1) {
    ltRemoveBtn.style.display = "block";
  }
});

//REMOVE LT
ltRemoveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const lt = document.querySelector(`#lt-${ltCount}`);
  lt.remove();
  ltCount--;
  // frCount.pop();
  if (ltCount < 2) {
    ltRemoveBtn.style.display = "none";
  }
});

function removeAddables() {
  while (loCount > 1) {
    const lo = document.querySelector(`#lo-${loCount}`);
    lo.remove();
    loCount--;
  }
  while (crCount > 1) {
    const cr = document.querySelector(`#cr-${crCount}`);
    cr.remove();
    crCount--;
  }
}

// !!SEPERATION!! SAVE COURSE INFORMATION TO DB
const creation = document.querySelector("#creation");
const courseMediaRef = storageRef.child("lms/course-media");

creation.addEventListener("keydown", (e) => {
  if (e.key === "enter") {
    e.preventDefault();
  }
});

creation.addEventListener("submit", (e) => {
  e.preventDefault();

  // LOADER DISPLAY
  // COLLECTIONS
  const submitBox = document.querySelector(".submit-box");
  const submissionInPprogressBox = document.querySelector(
    ".submission-in-progress"
  );
  const loader = document.querySelector(".loader");
  const completedIcon = document.querySelector(".completed-icon");

  let submittedVideos = false;
  let submittedThumbnail = false;
  let submittedInfo = false;

  // DISPLAY LOADING
  submitBox.style.display = "none";
  submissionInPprogressBox.style.display = "flex";

  // GENERAL INFORMATION
  const courseTitle = document.querySelector("#courseTitle").value;
  const urlReadyTitle = courseTitle.toLowerCase().replace(/\s+/g, "-");
  const briefDescription = document.querySelector("#briefDescription").value;
  const courseCategory = document.querySelector("#courseCategory").value;

  const thumbnailRef = courseMediaRef.child(`${urlReadyTitle}/thumbnail-image`);
  const videoRef = courseMediaRef.child(`${urlReadyTitle}/lecture-videos`);

  let learningObjectives = {};
  for (let i = 0; i < loCount; i++) {
    learningObjectives[`lo-${i + 1}`] = document.querySelector(
      `#lo-${i + 1}`
    ).value;
  }

  let courseRequirements = {};
  for (let i = 0; i < crCount; i++) {
    courseRequirements[`cr-${i + 1}`] = document.querySelector(
      `#cr-${i + 1}`
    ).value;
  }

  const fullDescription = document.querySelector("#fullDescription").value;
  const authorNotes = document.querySelector("#authorNotes").value;

  const thumbnailImg = document.querySelector("#thumbnail").files[0];
  const thumbnailImgRef = thumbnailRef.child(`thumbnail`);

  storeMedia(thumbnailImg, thumbnailImgRef, "thumb", 1);

  // LECTURE INFORMATION
  let lectureObj = {};

  for (let i = 0; i < ltCount; i++) {
    const lectureTitle = document.querySelector(`#lt-${i + 1}-title`).value;
    const lectureDescription = document.querySelector(
      `#lecture-${i + 1}-description`
    ).value;

    lectureObj[`lt-${i + 1}`] = {
      title: lectureTitle,
      description: lectureDescription,
    };

    const lectureVideo = document.querySelector(`#lt-${i + 1}-video`).files[0];
    const lectureVideoRef = videoRef.child(`lecture-video-${i + 1}`);

    if (i < ltCount - 1) {
      storeMedia(lectureVideo, lectureVideoRef, "dud", i + 1);
    } else {
      storeMedia(lectureVideo, lectureVideoRef, "video", i + 1);
    }
  }

  // STORE INFORMATION
  db.collection("courses")
    .doc(urlReadyTitle)
    .set({
      courseTitle: courseTitle,
      urlReadyTitle: urlReadyTitle,
      briefDescription: briefDescription,
      courseCategory: courseCategory,
      learningObjectives: learningObjectives,
      courseRequirements: courseRequirements,
      fullDescription: fullDescription,
      authorNotes: authorNotes,
      lectures: lectureObj,
      creator: sessionStorage.fullName,
    })
    .then(() => {
      submittedInfo = true;
      checkIfSubmitted();
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });

  // DISPLAY COMPLETE

  function storeMedia(media, mediaRef, type, number) {
    mediaRef.put(media).then(() => {
      mediaRef
        .getDownloadURL()
        .then((url) => {
          // console.log(`Pushed ${type} ${number}`);
          if (type === "thumb") {
            submittedThumbnail = true;
          } else if (type === "video") {
            submittedVideos = true;
          }

          checkIfSubmitted();
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  }

  function checkIfSubmitted() {
    if (
      // CHECK IF ALL MEDIA SUBMITTED EVERYTIME FUNCTION IS CALLED
      submittedInfo === true &&
      submittedThumbnail === true &&
      submittedVideos === true
    ) {
      if (document.querySelector(".submitModal").style.display === "none") {
        document.querySelector(".submit").dispatchEvent(new Event("click"));
      }
      loader.style.display = "none";
      completedIcon.style.display = "block";
      document.querySelector(".loading-message").innerHTML = "Course Created!";
      setTimeout(() => {
        document.querySelector(".loading-message").innerHTML =
          "Course Complete!";
      }, 3000);
      setTimeout(() => {
        location.reload();
      }, 10000);
    }
  }
});
