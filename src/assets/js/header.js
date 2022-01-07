$(function () {
  let role = localStorage.getItem("role");
  if (role == "Academic Department") {
    $(".header").load("./headers/acadHeader.html");
  } else if (role == "Administrative Department") {
    $(".header").load("./headers/adminHeader.html");
  } else if (role == "Lecturer") {
    $(".header").load("./headers/lecturerHeader.html");
  } else if (role == "Student") {
    $(".header").load("./headers/studentHeader.html");
  }
});
