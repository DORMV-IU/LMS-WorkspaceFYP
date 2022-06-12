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

var x = window.matchMedia("(max-width: 1000px)");
x.addListener(screen);
screen(x); // Call listener function at run time
