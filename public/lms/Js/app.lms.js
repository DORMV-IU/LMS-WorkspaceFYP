// THIS SHOULD ONLY CONTAIN JS CODE THAT NEEDS TO NOT BE DEFERRED. THE CODES HERE WILL RUN BEFORE THE PAGE CONCLUDES LOADING.

if (sessionStorage.accountType !== "student") {
  document.querySelector("#courseManagementBtn").style.display = "flex";
}
