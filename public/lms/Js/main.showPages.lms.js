// CHANGE PAGES
function changePage(previous, present, extra) {
  pageHistory = previous; //Track Previously Displayed Page
  console.log(pageHistory);
  document.querySelector(`${previous}`).style.display = "none";
  document.querySelector(`${present}`).style.display = "block";
  if (extra !== "") {
    document.querySelectorAll(`${extra}`).forEach((ex) => {
      ex.style.display = "none";
    });
  }
  // console.log(present, previous);
}
