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

export class Class {
  constructor(classId, courseCode, lecturerId, studentId, day, shift) {
    this.classId = classId;
    this.courseCode = courseCode;
    this.lecturerId = lecturerId;
    this.studentId = studentId;
    this.day = day;
    this.shift = shift;
  }

  async insert() {
    try {
      await setDoc(doc(Database.getInstance(), "class", this.classId), {
        courseCode: this.courseCode,
        lecturerId: this.lecturerId,
        studentId: this.studentId,
        day: this.day,
        shift: this.shift,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async get(classId) {
    const data = await getDoc(
      doc(Database.getInstance(), "class", classId).withConverter(
        classConverter
      )
    );
    return data.data();
  }

  static async getAll() {
    const queryGetAllClasses = query(
      collection(Database.getInstance(), "class").withConverter(classConverter)
    );
    let datas = await getDocs(queryGetAllClasses);
    let classList = datas.docs.map((d) => {
      return d.data();
    });

    return classList;
  }

  static async getLecturerAll(lecturerId) {
    const queryGetAllClasses = query(
      collection(Database.getInstance(), "class"),
      where("lecturerId", "==", lecturerId)
    ).withConverter(classConverter);
    let datas = await getDocs(queryGetAllClasses);
    let classList = datas.docs.map((d) => {
      return d.data();
    });

    return classList;
  }

  static async getStudentClasses(studentId) {
    const queryGetAllClasses = query(
      collection(Database.getInstance(), "class"),
      where("studentId", "array-contains", studentId)
    ).withConverter(classConverter);
    let datas = await getDocs(queryGetAllClasses);
    let classList = datas.docs.map((d) => {
      return d.data();
    });

    return classList;
  }
}

const classConverter = {
  toFirestore: (c) => {
    return {
      classId: c.classId,
      courseCode: c.courseCode,
      lecturerId: c.lecturerId,
      studentId: c.studentId,
      day: c.day,
      shift: c.shift,
    };
  },
  fromFirestore: (snapshot, options) => {
    let d = snapshot.data(options);
    return new Class(
      snapshot.id,
      d.courseCode,
      d.lecturerId,
      d.studentId,
      d.day,
      d.shift
    );
  },
};
