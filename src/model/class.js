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
  constructor(
    courseId,
    name,
    courseDesc,
    credit,
    learningOutcomes,
    strategies,
    textbooks
  ) {
    this.courseId = courseId;
    this.name = name;
    this.courseDesc = courseDesc;
    this.credit = credit;
    this.learningOutcomes = learningOutcomes;
    this.strategies = strategies;
    this.textbooks = textbooks;
  }

  async insert() {
    try {
      await setDoc(doc(Database.getInstance(), "course", this.courseId), {
        name: this.name,
        courseDesc: this.courseDesc,
        credit: this.credit,
        learningOutcomes: this.learningOutcomes,
        strategies: this.strategies,
        textbooks: this.textbooks,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async get(courseId) {
    const data = await getDoc(
      doc(Database.getInstance(), "course", courseId).withConverter(
        courseConverter
      )
    );
    return data.data();
  }

  static async update(
    courseId,
    name,
    courseDesc,
    credit,
    learningOutcomes,
    strategies,
    textbooks
  ) {
    try {
      await updateDoc(doc(Database.getInstance(), "course", courseId), {
        name: name,
        courseDesc: courseDesc,
        credit: credit,
        learningOutcomes: learningOutcomes,
        strategies: strategies,
        textbooks: textbooks,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async delete(courseId) {
    try {
      await deleteDoc(doc(Database.getInstance(), "course", courseId));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAllClasss() {
    const queryGetAllClasss = query(
      collection(Database.getInstance(), "course").withConverter(
        courseConverter
      )
    );
    let datas = await getDocs(queryGetAllClasss);
    let courseList = datas.docs.map((d) => {
      return d.data();
    });

    return courseList;
  }
}

const courseConverter = {
  toFirestore: (course) => {
    return {
      courseId: course.courseId,
      name: course.name,
      courseDesc: course.courseDesc,
      credit: course.credit,
      learningOutcomes: course.learningOutcomes,
      strategies: course.strategies,
      textbooks: course.textbooks,
    };
  },
  fromFirestore: (snapshot, options) => {
    let d = snapshot.data(options);
    return new Class(
      snapshot.id,
      d.name,
      d.courseDesc,
      d.credit,
      d.learningOutcomes,
      d.strategies,
      d.textbooks
    );
  },
};
