const courseID = String(sessionStorage.courseID);
const enrollBtn = document.querySelector(".enroll-enabled");
const lectureMediaRef = storageRef.child(
  `lms/course-media/${courseID}/lecture-videos`
);

let thumbURL = "";

enrollBtn.addEventListener("click", (e) => {
  enrollBtn.classList.add("loading");
  setTimeout(() => {
    enrollBtn.classList.remove("loading");
    document.querySelector(".enrolled").style.display = "flex";
    document.querySelector(".notEnrolled").style.display = "none";

    displayLectures();
  }, 5000);
});

db.collection("courses")
  .doc(courseID)
  .get()
  .then((doc) => {
    const courseMediaRef = storageRef.child("lms/course-media");
    const course = doc.data();

    // AUTHOR PROFILE INFO
    const authorImageRef = storageRef.child(
      `users/profile_images/${course.authorUid}/profile.jpg`
    );

    authorImageRef
      .getDownloadURL()
      .then((authorImageUrl) => {
        document.querySelectorAll(".authorImg").forEach((data) => {
          data.setAttribute("src", `${authorImageUrl}`);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });

    //THINGS TO DISPLAY
    document.querySelector("#course-title").innerHTML = course.courseTitle;
    document.querySelector(".subTitle").innerHTML = course.briefDescription;
    document.querySelector(".category").innerHTML = course.courseCategory;

    document.querySelectorAll(".author").forEach((data) => {
      data.innerHTML = course.author;
    });

    document.querySelectorAll(".authorNotesTxt").forEach((data) => {
      data.innerHTML = course.authorNotes;
    });

    document.querySelectorAll(".course-description").forEach((data) => {
      data.innerHTML = course.fullDescription;
    });

    const objSet = document.querySelector(".obj-set");
    const reqSet = document.querySelector(".req-set");

    const learnObj = course.learningObjectives;
    const learnObjKeys = Object.keys(learnObj);
    const reqObj = course.courseRequirements;
    const reqObjKeys = Object.keys(reqObj);
    const lectureObj = course.lectures;
    const lectureObjKeys = Object.keys(lectureObj);

    // STATISTICS
    document.querySelector("#videoNumber").innerHTML = lectureObjKeys.length;
    console.log(lectureObjKeys.length);

    let html = "";

    // DISPLAYING OBJECTS
    for (let i = 1; i < learnObjKeys.length + 1; i++) {
      const obj = learnObj[`lo-${i}`];
      const objDiv = `
        <div class="objective">
            <span><i class="fa-solid fa-check"></i></span>
            <p>${obj}</p>
        </div>
        `;
      html += objDiv;
    }

    objSet.innerHTML = html;

    html = "";

    for (let i = 1; i < reqObjKeys.length + 1; i++) {
      const obj = reqObj[`cr-${i}`];
      const objDiv = `<li>${obj}</li>`;
      html += objDiv;
    }

    reqSet.innerHTML = html;

    courseMediaRef
      .child(`${courseID}/thumbnail-image/thumbnail`)
      .getDownloadURL()
      .then((thumbnailUrl) => {
        thumbURL = thumbnailUrl;
        document.querySelector(".banner").setAttribute(
          "style",
          `background: linear-gradient(90deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)),
                url("${thumbnailUrl}");
                background-position: center;
                background-size: cover;`
        );
      });
  })
  .catch((error) => {
    console.log(error.message);
  });

// DISPLAYING LECTURES
function displayLectures() {
  db.collection("courses")
    .doc(courseID)
    .get()
    .then((doc) => {
      const course = doc.data();

      const lectureObj = course.lectures;
      const lectureObjKeys = Object.keys(lectureObj);
      const contentSet = document.querySelector(".content-set");
      let html = "";

      // DISPLAY LECTURE 1 IN FULL
      lectureMediaRef
        .child(`lecture-video-1`)
        .getDownloadURL()
        .then((url) => {
          const activeVideo = document.querySelector("#activeVideo");
          activeVideo.setAttribute("poster", `${thumbURL}`);
          activeVideo.innerHTML = `
            <source src="${url}" type="video/mp4" />
            Your browser does not support the video tag.
          `;

          document.querySelector(
            "#lectureTitle"
          ).innerHTML = `#1: ${lectureObj["lt-1"].title}`;

          document.querySelector("#lectureDescription").innerHTML =
            lectureObj[`lt-1`].description;
        });

      for (let i = 1; i < lectureObjKeys.length + 1; i++) {
        const ltTitle = lectureObj[`lt-${i}`].title;

        const ltDiv = `
          <div class="content-button ${i === 1 ? "active" : ""}" id = 'lt-${i}'>
            <span class="icon"><input type="checkbox" /></span>
            <p>
              <span>#${i}:</span> ${ltTitle}
            </p>
          </div>
        `;

        html += ltDiv;
      }

      contentSet.innerHTML = html;

      //SWITCH LECTURES !!SEPERATION!!
      const contentButtons = document.querySelectorAll(".content-button");
      contentButtons.forEach((btn, x) => {
        btn.addEventListener("click", (e) => {
          const btnID = e.target.id;
          const btnVideo = lectureMediaRef.child(`lecture-video-${x + 1}`);
          const activeVideo = document.querySelector("#activeVideo");

          contentButtons.forEach((data) => {
            if (data.id !== btnID) {
              data.classList.remove("active");
            }
          });

          btn.classList.add("active");

          btnVideo
            .getDownloadURL()
            .then((vidurl) => {
              activeVideo.innerHTML = `
                  <source src="${vidurl}" type="video/mp4" />
                  Your browser does not support the video tag.
                `;
              activeVideo.load();

              document.querySelector("#lectureTitle").innerHTML = `#${x + 1}: ${
                lectureObj["lt-" + (x + 1)].title
              }`;

              document.querySelector("#lectureDescription").innerHTML =
                lectureObj[`lt-${x + 1}`].description;
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
