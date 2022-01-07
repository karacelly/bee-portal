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
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { Database } from "./firebase.js";

export class Exam {
  constructor(examId, courseCode, startDate, endDate, proctorId, examType) {
    this.examId = examId;
    this.courseCode = courseCode;
    this.startDate = startDate;
    this.endDate = endDate;
    this.proctorId = proctorId;
    this.examType = examType;
  }

  static async setProctor(examId, proctorId) {
    try {
      console.log(examId);
      await updateDoc(doc(Database.getInstance(), "exam", examId), {
        proctorId: proctorId,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAll() {
    const queryGetAll = query(
      collection(Database.getInstance(), "exam").withConverter(examConverter)
    );
    let datas = await getDocs(queryGetAll);
    let list = datas.docs.map((d) => {
      return d.data();
    });

    return list;
  }
}

const examConverter = {
  toFirestore: (curr) => {
    return {
      examId: curr.examId,
      courseCode: curr.courseCode,
      startDate: curr.startDate,
      endDate: curr.endDate,
      proctorId: curr.proctorId,
      examType: curr.examType,
    };
  },
  fromFirestore: (snapshot, options) => {
    let d = snapshot.data(options);
    return new Exam(
      snapshot.id,
      d.courseCode,
      d.startDate,
      d.endDate,
      d.proctorId,
      d.examType
    );
  },
};
