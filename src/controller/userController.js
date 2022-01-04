import { User } from "../model/user.js";

export class UserController {
  constructor() {}

  static async auth(email, password) {
    return await User.getUserByEmailAndPassword(email, password);
  }
}
