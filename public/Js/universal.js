//SCRIPT IS NOT DEFERRED AND WILL RUN IMMEDIATELY

function screen(x) {
  if (x.matches) {
    // If media query matches
    document.querySelector(".loginWrapper").style.display = "none";
    // document.querySelector(".desktop").style.display = "none";
    document.querySelector(".notDesktopMode").style.display = "block";
  } else {
    document.querySelector(".loginWrapper").style.display = "flex";
    // document.querySelector(".desktop").style.display = "flex";
    document.querySelector(".notDesktopMode").style.display = "none";
  }
}

const x = window.matchMedia("(max-width: 1000px)");
x.addListener(screen);
window.addEventListener("load", () => {
  screen(x);
});
