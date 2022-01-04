import { Curriculum } from "../model/curriculum.js";

export class CurriculumController {
  constructor() {}

  static async insertCurriculum(courses, majorId, semester, totalCreds) {
    let curriculum = new Curriculum(
      null,
      courses,
      majorId,
      semester,
      totalCreds
    );
    let curriculumObj = await curriculum.insert();
    if (curriculumObj) {
      window.location.assign("../view/viewAllCurriculum.html");
      return true;
    }
    return false;
  }

  static async getCurriculum(curriculumId) {
    return await Curriculum.get(curriculumId);
  }

  static async updateCurriculum(
    curriculumId,
    courses,
    majorId,
    semester,
    totalCreds
  ) {
    let success = await Curriculum.update(
      curriculumId,
      courses,
      majorId,
      semester,
      totalCreds
    );
    if (success === true) {
      window.location.assign("../view/viewAllCurriculum.html");
      return true;
    }

    return false;
  }

  static async getAllCurriculum() {
    return await Curriculum.getAll();
  }

  static async deleteCurriculum(curriculumId) {
    return await Curriculum.delete(curriculumId);
  }
}
