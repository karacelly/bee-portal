import { User, Proctor, Lecturer } from "../model/user.js";

export class UserController {
  constructor() {}

  static async auth(email, password) {
    return await User.getUserByEmailAndPassword(email, password);
  }

  static async getUser(userId) {
    return await User.get(userId);
  }

  static async getAllStudents() {
    return await User.getAllStudents();
  }

  static async getAllLecturers() {
    return await User.getAllLecturers();
  }

  static async getAllAvailableProctors() {
    return await User.getAllAvailableProctors();
  }

  static async setProctorAvailability(userId, isAvailable) {
    let success = await Proctor.setProctorAvailability(userId, isAvailable);

    if (success === true) {
      window.location.assign("../view/viewAllExam.html");
    } else return false;
  }
}
