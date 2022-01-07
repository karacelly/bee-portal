import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { Database } from "./firebase.js";

export class SessionMapping {
  constructor(
    sessionId,
    courseCode,
    sessionNumber,
    sessionType,
    sessionTitle,
    subTopic
  ) {
    this.sessionId = sessionId;
    this.courseCode = courseCode;
    this.sessionNumber = sessionNumber;
    this.sessionType = sessionType;
    this.sessionTitle = sessionTitle;
    this.subTopic = subTopic;
  }

  static async getAllByCourseId(courseId) {
    const db = Database.getInstance();

    const querySnapshot = query(
      collection(db, "sessionMapping"),
      where("courseCode", "==", courseId),
      orderBy("sessionNumber")
    ).withConverter(sessionMappingConverter);

    const data = await getDocs(querySnapshot);
    const sessionMappingList = data.docs.map((doc) => doc.data());

    return sessionMappingList;
  }
}

const sessionMappingConverter = {
  toFirestore: (curr) => {
    return {
      sessionId: curr.sessionId,
      courseCode: curr.courseCode,
      sessionNumber: curr.sessionNumber,
      sessionType: curr.sessionType,
      sessionTitle: curr.sessionTitle,
      subTopic: curr.subTopic,
    };
  },
  fromFirestore: (snapshot, options) => {
    let d = snapshot.data(options);
    return new SessionMapping(
      snapshot.id,
      d.courseCode,
      d.sessionNumber,
      d.sessionType,
      d.sessionTitle,
      d.subTopic
    );
  },
};
