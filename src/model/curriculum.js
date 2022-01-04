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

export class Curriculum {
  constructor(curriculumId, courses, majorId, semester, totalCreds) {
    this.curriculumId = curriculumId;
    this.courses = courses;
    this.majorId = majorId;
    this.semester = semester;
    this.totalCreds = totalCreds;
  }

  async insert() {
    try {
      const docIns = await addDoc(
        collection(Database.getInstance(), "curriculum"),
        {
          courses: this.courses,
          majorId: this.majorId,
          semester: this.semester,
          totalCreds: this.totalCreds,
        }
      );
      return {
        curriculumId: docIns.id,
        courses: this.courses,
        majorId: this.majorId,
        semester: this.semester,
        totalCreds: this.totalCreds,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async get(curriculumId) {
    const data = await getDoc(
      doc(Database.getInstance(), "curriculum", curriculumId).withConverter(
        curriculumConverter
      )
    );
    return data.data();
  }

  static async update(curriculumId, courses, majorId, semester, totalCreds) {
    try {
      console.log(courses);
      console.log(majorId);
      console.log(semester);
      console.log(totalCreds);
      await updateDoc(doc(Database.getInstance(), "curriculum", curriculumId), {
        courses: courses,
        majorId: majorId,
        semester: semester,
        totalCreds: totalCreds,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getAll() {
    const queryGetAll = query(
      collection(Database.getInstance(), "curriculum").withConverter(
        curriculumConverter
      )
    );
    let datas = await getDocs(queryGetAll);
    let list = datas.docs.map((d) => {
      return d.data();
    });

    return list;
  }

  static async delete(curriculumId) {
    try {
      await deleteDoc(doc(Database.getInstance(), "curriculum", curriculumId));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const curriculumConverter = {
  toFirestore: (curr) => {
    return {
      curriculumId: curr.curriculumId,
      courses: curr.courses,
      majorId: curr.majorId,
      semester: curr.semester,
      totalCreds: curr.totalCreds,
    };
  },
  fromFirestore: (snapshot, options) => {
    let d = snapshot.data(options);
    return new Curriculum(
      snapshot.id,
      d.courses,
      d.majorId,
      d.semester,
      d.totalCreds
    );
  },
};
