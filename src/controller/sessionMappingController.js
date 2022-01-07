import { SessionMapping } from "../model/sessionMapping.js";

export class SessionMappingController {
  constructor() {}

  static async getAllByCourseId(courseId) {
    return await SessionMapping.getAllByCourseId(courseId);
  }
}
