db.collection("courses")
  .orderBy("dateCreated", "desc")
  .limit(3)
  .get()
  .then((snapshot) => {
    const latestCourse = document.querySelector("#latest-courses");
    const courseMediaRef = storageRef.child("lms/course-media");
    let html = "";

    if (snapshot.docs.length > 0) {
      snapshot.docs.forEach((doc, i) => {
        const course = doc.data();
        const courseId = course.urlReadyTitle;
        const courseTitle = course.courseTitle;
        const description = course.briefDescription;
        const author = course.author;

        courseMediaRef
          .child(`${courseId}/thumbnail-image/thumbnail`)
          .getDownloadURL()
          .then((thumbnailUrl) => {
            document
              .querySelectorAll(".thumbnail")
              [i].setAttribute(
                "style",
                `background-image: url("${thumbnailUrl}"); background-size: cover; background-repeat: no-repeat; background-position: center;`
              );
          });

        const div = `\n
        <div class="course course-open" id="${courseId}">
            <div class = "thumbnail">
                <div class="overlay">
                    <i class="fa-solid fa-angles-right"></i>
                </div>
                </div>
                <div class="info">
                <h2>${courseTitle}</h2>
                <p class="description">${description}</p>
                <p class="creator">${author}</p>
            </div>
        </div>
              `;

        html += div;
      });

      latestCourse.innerHTML = html;
    }

    //PAGE CHANGE LISTENERS
    const coursePageBtn = document.querySelectorAll(".course-open");

    coursePageBtn.forEach((btn, i) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.courseID = coursePageBtn[i].id;
        sessionStorage.currentUrl = `./courses.html?course=${sessionStorage.courseID}`;
        window.location.href = sessionStorage.currentUrl;
      });
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

{
  /* <div class="course course-open" id="data-analysis">
                    <div
                      style="
                        background: url('../Images/Default_Thumbnails/pexels-anna-nekrashevich-6801648.jpg');
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                      "
                      class="thumbnail"
                    >
                      <div class="overlay">
                        <i class="fa-solid fa-angles-right"></i>
                      </div>
                    </div>
                    <div class="info">
                      <h2>Data Analysis for Beginners</h2>
                      <p class="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Donec ultrices tincidunt arcu non sodales
                        neque sodales ut etiam.
                      </p>
                      <p class="creator">Fedrick Okon | Ph. D</p>
                    </div>
                  </div> */
}
