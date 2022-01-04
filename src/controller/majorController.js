import { Major } from "../model/major.js";

export class MajorController {
  constructor() {}

  static async getMajor(majorId) {
    return await Major.get(majorId);
  }
}
