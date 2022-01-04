$(function () {
  let role = localStorage.getItem("role");
  if (role == "Academic Department") {
    $(".header").load("acadHeader.html");
  } else if (role == "Administrative Department") {
    $(".header").load("adminHeader.html");
  }
});
