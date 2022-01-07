import { Class } from "../model/class.js";

export class ClassController {
  constructor() {}

  static async getClass(classId) {
    return await Class.get(classId);
  }

  static async insertClass(
    classId,
    courseCode,
    lecturerId,
    studentId,
    day,
    shift
  ) {
    if (classId) {
      let c = await this.getClass(classId);

      if (!c) {
        let cl = new Class(
          classId,
          courseCode,
          lecturerId,
          studentId,
          day,
          shift
        );

        let classObj = await cl.insert();
        if (classObj) {
          window.location.assign("../view/viewAllClass.html");
          return true;
        }
      } else return false;
    }
  }

  static async getAllClasses() {
    return await Class.getAll();
  }

  static async getLecturerClasses(lecturerId) {
    return await Class.getLecturerAll(lecturerId);
  }

  static async deleteClass(classId) {
    return await Class.delete(classId);
  }
}
