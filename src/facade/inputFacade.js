import { UserController } from "../controller/userController.js";
import { CourseController } from "../controller/courseController.js";
import { CurriculumController } from "../controller/curriculumController.js";
import { ClassController } from "../controller/classController.js";
import { ExamController } from "../controller/examController.js";
import { ForumController } from "../controller/forumController.js";
import { AssignmentController } from "../controller/assignmentController.js";
import { getMultipleSelectValues } from "../assets/js/utils.js";

export class InputFacade {
  constructor() {}

  async authUser() {
    console.log("authUser");
    let email = document.getElementById("email");
    let pass = document.getElementById("password-field");

    var error = document.getElementById("error");
    let returnVal = await UserController.auth(email.value, pass.value);
    console.log(returnVal);
    if (returnVal == false) {
      error.textContent = "Credential invalid!";
      error.style.color = "red";
    } else {
      error.textContent = "";
      localStorage.setItem("user", returnVal[0].userId);
      localStorage.setItem("username", returnVal[0].name);
      localStorage.setItem("role", returnVal[0].role);
      window.location.assign("./dashboard.html");
    }
  }

  async createCurriculum() {
    console.log("create curriculum");

    let majorId = document.getElementById("majorId").value;
    let semester = document.getElementById("semester").value;
    let totalCreds = document.getElementById("totalCreds").value;

    let courses = document.getElementsByClassName("courseList");
    let courseList = [];
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].value.trim() != "") courseList.push(courses[i].value);
    }

    await CurriculumController.insertCurriculum(
      courseList,
      majorId,
      Number(semester),
      Number(totalCreds)
    );
  }

  async createClass() {
    console.log("create class");

    let select = document.getElementById("studentIds");
    let studentIds = getMultipleSelectValues(select);
    let lecturerId = document.getElementById("lecturerId").value;
    let classCode = document.getElementById("classId").value;
    let courseId = document.getElementById("courseId").value;
    let day = document.getElementById("day");
    let shift = document.getElementById("shift");

    await ClassController.insertClass(
      classCode,
      courseId,
      lecturerId,
      studentIds,
      Number(day),
      Number(shift)
    );
  }

  async createForum(classId, hide) {
    console.log("create forum");

    let userId = localStorage.getItem("user");
    let session = document.getElementById("sessionId").value;
    let title = document.getElementById("title").value;
    let con = document.getElementById("content-input").value;

    console.log(con);
    await ForumController.insertForum(
      classId,
      userId,
      session,
      title,
      con,
      hide,
      false
    );
  }

  async createAssignment() {
    console.log("create assignment");

    let classId = document.getElementById("classId").value;
    let assignmentType = document.getElementById("assignment-type").value;
    let deadlineDate = document.getElementById("deadline-date").value;
    let assignmentQuestion = document.getElementById(
      "assignment-question"
    ).value;

    console.log(classId);
    console.log(assignmentType);
    console.log(deadlineDate);
    console.log(assignmentQuestion);

    await AssignmentController.insertAssignment(
      classId,
      assignmentType,
      deadlineDate,
      assignmentQuestion
    );
  }

  async createCourse() {
    console.log("create course");

    let id = document.getElementById("courseId").value;
    let name = document.getElementById("courseName").value;
    console.log(id);
    let cred = document.getElementById("creditNumber").value;
    let desc = document.getElementById("courseDesc").value;

    // array
    let LO = document.getElementsByClassName("LO");
    console.log(LO);
    let LOval = [];
    for (let i = 0; i < LO.length - 1; i++) {
      if (LO[i].value.trim() != "") LOval.push(LO[i].value);
    }

    let strat = document.getElementsByClassName("strat");
    let stratval = [];
    for (let i = 0; i < strat.length - 1; i++) {
      if (strat[i].value.trim() != "") stratval.push(strat[i].value);
    }

    let txt = document.getElementsByClassName("txt");
    let txtval = [];
    for (let i = 0; i < txt.length - 1; i++) {
      if (txt[i].value.trim() != "") txtval.push(txt[i].value);
    }

    await CourseController.insertCourse(
      id,
      name,
      desc,
      Number(cred),
      LOval,
      stratval,
      txtval
    );
  }

  async updateCourse() {
    console.log("update course");

    let id = document.getElementById("courseId").value;
    let name = document.getElementById("courseName").value;
    console.log(id);
    let cred = document.getElementById("creditNumber").value;
    let desc = document.getElementById("courseDesc").value;

    // array
    let LO = document.getElementsByClassName("LO");
    let LOval = [];
    for (let i = 0; i < LO.length - 1; i++) {
      if (LO[i].value.trim() != "") LOval.push(LO[i].value);
    }
    console.log(LOval);

    let strat = document.getElementsByClassName("strat");
    let stratval = [];
    for (let i = 0; i < strat.length - 1; i++) {
      if (strat[i].value.trim() != "") stratval.push(strat[i].value);
    }

    let txt = document.getElementsByClassName("txt");
    let txtval = [];
    for (let i = 0; i < txt.length - 1; i++) {
      if (txt[i].value.trim() != "") txtval.push(txt[i].value);
    }

    await CourseController.updateCourse(
      id,
      name,
      desc,
      Number(cred),
      LOval,
      stratval,
      txtval
    );
  }

  async updateCurriculum() {
    console.log("update curriculum");

    const urlQuery = new URLSearchParams(window.location.search);

    let majorId = document.getElementById("majorId").value;
    let semester = document.getElementById("semester").value;
    let totalCreds = document.getElementById("totalCreds").value;

    let courses = document.getElementsByClassName("courseList");
    let courseList = [];
    for (let i = 0; i < courses.length - 1; i++) {
      if (courses[i].value.trim() != "") courseList.push(courses[i].value);
    }

    await CurriculumController.updateCurriculum(
      urlQuery.get("curriculumId"),
      courseList,
      majorId,
      Number(semester),
      Number(totalCreds)
    );
  }

  async setProctor() {
    const urlQuery = new URLSearchParams(window.location.search);

    let examId = urlQuery.get("examId");
    let proctorId = document.getElementById("proctors").value;

    await ExamController.setProctor(examId, proctorId);
  }
}
