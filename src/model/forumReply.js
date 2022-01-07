import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  addDoc,
  getFirestore,
  updateDoc,
  query,
  setDoc,
  getDoc,
  where,
  limit,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { Database } from "./firebase.js";

export class ForumReply {
  constructor(replyId, forumId, userId, content) {
    this.replyId = replyId;
    this.forumId = forumId;
    this.userId = userId;
    this.content = content;
  }

  async insert() {
    try {
      const docIns = await addDoc(
        collection(Database.getInstance(), "forumReply"),
        {
          forumId: this.forumId,
          userId: this.userId,
          content: this.content,
        }
      );
      return {
        repyId: this.repyId,
        forumId: this.forumId,
        userId: this.userId,
        content: this.content,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async get(replyId) {
    const data = await getDoc(
      doc(Database.getInstance(), "forumReply", replyId).withConverter(
        forumReplyConverter
      )
    );
    return data.data();
  }

  static async getAllByForumId(forumId) {
    console.log(forumId);
    const queryGetAllReplyForum = query(
      collection(Database.getInstance(), "forumReply"),
      where("forumId", "==", forumId)
    ).withConverter(forumReplyConverter);
    let datas = await getDocs(queryGetAllReplyForum);
    let replies = datas.docs.map((d) => {
      return d.data();
    });
    return replies;
  }
}

const forumReplyConverter = {
  toFirestore: (curr) => {
    return {
      repyId: curr.repyId,
      forumId: curr.forumId,
      userId: curr.userId,
      content: curr.content,
    };
  },
  fromFirestore: (snapshot, options) => {
    let d = snapshot.data(options);
    return new ForumReply(snapshot.id, d.forumId, d.userId, d.content);
  },
};
