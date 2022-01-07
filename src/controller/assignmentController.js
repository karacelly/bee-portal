import { Assignment } from "../model/assignment.js";

export class AssignmentController {
  constructor() {}

  static async insertAssignment(
    classId,
    assignmentType,
    deadlineDate,
    assignmentQuestion
  ) {
    let assignment = new Assignment(
      null,
      classId,
      assignmentType,
      deadlineDate,
      assignmentQuestion
    );
    let success = await assignment.insert();

    if (success === true) {
      window.location.assign("../view/viewClassDetail.html?classId=" + classId);
    }
    return success;
  }

  static async getAssignment(assignmentId) {
    return await Assignment.get(assignmentId);
  }

  static async getAllPersonalAssignment(classId) {
    return await Assignment.getAllPersonalAssignment(classId);
  }

  static async getAllGroupAssignment(classId) {
    return await Assignment.getAllGroupAssignment(classId);
  }
}
