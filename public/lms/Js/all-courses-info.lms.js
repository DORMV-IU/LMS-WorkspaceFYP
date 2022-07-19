db.collection("courses")
  .orderBy("dateCreated", "asc")
  .get()
  .then((snapshot) => {
    const courses = document.querySelector(".table");
    let html = "";

    if (snapshot.docs.length > 0) {
      snapshot.docs.forEach((doc, i) => {
        const course = doc.data();
        const courseId = course.urlReadyTitle;
        const courseTitle = course.courseTitle;
        const category = course.courseCategory;
        const status = course.activeStatus;

        const div = `\n
            <div class="courses tr" id="${courseId}">
                <div class="number td"><p>${i + 1}</p></div>
                <div class="title-thumbnail td">
                    <p>${courseTitle}</p>
                </div>
                <div class="category td"><p>${category}</p></div>
                <div class="status td"><p>${
                  status ? "Active" : "Inactive"
                }</p></div>
            </div>
                  `;

        html += div;
      });

      courses.innerHTML += html;
    }
  });

{
  /* <div class="course-table-head tr">
                  <div class="number th"><p>S/N</p></div>
                  <div class="title-thumbnail th"><p>Course</p></div>
                  <div class="category th"><p>Category</p></div>
                  <div class="status th"><p>Status</p></div>
                </div> */
}
