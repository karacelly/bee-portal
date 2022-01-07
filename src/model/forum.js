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

export class Forum {
  constructor(
    forumId,
    classId,
    userId,
    sessionId,
    title,
    content,
    hideReply,
    isLocked,
    postedDate
  ) {
    this.forumId = forumId;
    this.classId = classId;
    this.userId = userId;
    this.sessionId = sessionId;
    this.title = title;
    this.content = content;
    this.hideReply = hideReply;
    this.isLocked = isLocked;
    this.postedDate = postedDate;
  }

  async insert() {
    try {
      const docIns = await addDoc(collection(Database.getInstance(), "forum"), {
        classId: this.classId,
        userId: this.userId,
        sessionId: this.sessionId,
        title: this.title,
        content: this.content,
        hideReply: this.hideReply,
        isLocked: this.isLocked,
        postedDate: serverTimestamp(),
      });
      return {
        forumId: this.forumId,
        classId: this.classId,
        userId: this.userId,
        sessionId: this.sessionId,
        title: this.title,
        content: this.content,
        hideReply: this.hideReply,
        isLocked: this.isLocked,
        postedDate: this.postedDate,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async get(forumId) {
    const data = await getDoc(
      doc(Database.getInstance(), "forum", forumId).withConverter(
        forumConverter
      )
    );
    return data.data();
  }

  static async update(forumId, content) {
    try {
      await updateDoc(doc(Database.getInstance(), "forum", forumId), {
        content: content,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAll() {
    const queryGetAll = query(
      collection(Database.getInstance(), "forum").withConverter(forumConverter)
    );
    let datas = await getDocs(queryGetAll);
    let list = datas.docs.map((d) => {
      return d.data();
    });

    return list;
  }

  static async getAllByClass(classId) {
    console.log(classId);
    const queryGetAllClassForum = query(
      collection(Database.getInstance(), "forum"),
      where("classId", "==", classId)
    ).withConverter(forumConverter);
    let datas = await getDocs(queryGetAllClassForum);
    let forums = datas.docs.map((d) => {
      return d.data();
    });
    return forums;
  }

  static async delete(forumId) {
    try {
      await deleteDoc(doc(Database.getInstance(), "forum", forumId));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const forumConverter = {
  toFirestore: (curr) => {
    return {
      forumId: curr.forumId,
      classId: curr.classId,
      userId: curr.userId,
      sessionId: curr.sessionId,
      title: curr.title,
      content: curr.content,
      hideReply: curr.hideReply,
      isLocked: curr.isLocked,
      postedDate: curr.postedDate,
    };
  },
  fromFirestore: (snapshot, options) => {
    let d = snapshot.data(options);
    return new Forum(
      snapshot.id,
      d.classId,
      d.userId,
      d.sessionId,
      d.title,
      d.content,
      d.hideReply,
      d.isLocked,
      d.postedDate
    );
  },
};
