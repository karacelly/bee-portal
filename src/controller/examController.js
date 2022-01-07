import { Exam } from "../model/exam.js";
import { UserController } from "./userController.js";

export class ExamController {
  constructor() {}

  static async getAllExams() {
    return await Exam.getAll();
  }

  static async setProctor(examId, proctorId) {
    let success = await Exam.setProctor(examId, proctorId);
    if (success) {
      UserController.setProctorAvailability(proctorId, false);
      return true;
    } else return false;
  }
}
