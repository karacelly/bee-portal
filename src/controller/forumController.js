import { Forum } from "../model/forum.js";
import { ForumReply } from "../model/forumReply.js";

export class ForumController {
  constructor() {}

  static async insertForum(
    classId,
    userId,
    sessionId,
    title,
    content,
    hideReply,
    isLocked
  ) {
    let forum = new Forum(
      null,
      classId,
      userId,
      sessionId,
      title,
      content,
      hideReply,
      isLocked,
      null
    );
    let forumObj = await forum.insert();
    if (forumObj) {
      window.location.assign("../view/viewAllClass.html");
      return true;
    }
    return false;
  }

  static async getForum(forumId) {
    return await Forum.get(forumId);
  }

  static async updateForum(forumId, content) {
    let success = await Forum.update(forumId, content);
    if (success === true) {
      window.location.assign("../view/viewAllClass.html");
      return true;
    }

    return false;
  }

  static async getAllByClass(classId) {
    return await Forum.getAllByClass(classId);
  }

  static async getAllForum() {
    return await Forum.getAll();
  }

  static async deleteForum(forumId) {
    let success = await Forum.delete(forumId);
    if (success === true) {
      window.location.assign("../view/viewAllClass.html");
      return true;
    }

    return false;
  }

  static async replyForum(content, userId, forumId) {
    let reply = new ForumReply(null, forumId, userId, content);
    let replyObj = await reply.insert();
    if (replyObj) {
      return true;
    }
    return false;
  }

  static async getAllReplyByForumId(forumId) {
    return await ForumReply.getAllByForumId(forumId);
  }
}
