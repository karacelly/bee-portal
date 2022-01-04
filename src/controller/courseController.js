import { Course } from "../model/course.js";

export class CourseController {
  constructor() {}

  static async getCourse(courseId) {
    return await Course.get(courseId);
  }

  static async insertCourse(
    courseId,
    name,
    courseDesc,
    credit,
    learningOutcomes,
    strategies,
    textbooks
  ) {
    if (courseId) {
      let cc = await this.getCourse(courseId);

      if (!cc) {
        let cc = new Course(
          courseId,
          name,
          courseDesc,
          credit,
          learningOutcomes,
          strategies,
          textbooks
        );
        console.log("No Coursenya");
        let success = await cc.insert();

        if (success === true) {
          window.location.assign("../view/viewAllCourse.html");
          return true;
        }
      } else return false;
    }
  }

  static async updateCourse(
    courseId,
    name,
    courseDesc,
    credit,
    learningOutcomes,
    strategies,
    textbooks
  ) {
    let success = await Course.update(
      courseId,
      name,
      courseDesc,
      credit,
      learningOutcomes,
      strategies,
      textbooks
    );
    if (success === true) {
      window.location.assign("../view/viewAllCourse.html");
      return true;
    }

    return false;
  }

  static async getAllCourses() {
    return await Course.getAllCourses();
  }

  static async deleteCourse(courseId) {
    return await Course.delete(courseId);
  }
}
