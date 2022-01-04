import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  addDoc,
  getFirestore,
  query,
  setDoc,
  getDoc,
  where,
  limit,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { Database } from "./firebase.js";

export class Major {
  constructor(majorId, name) {
    this.majorId = majorId;
    this.name = name;
  }

  static async get(majorId) {
    const data = await getDoc(
      doc(Database.getInstance(), "major", majorId).withConverter(
        majorConverter
      )
    );
    return data.data();
  }

  static async getAll() {
    const queryGetAll = query(
      collection(Database.getInstance(), "major").withConverter(majorConverter)
    );
    let datas = await getDocs(queryGetAll);
    let majorList = datas.docs.map((d) => {
      return d.data();
    });

    return majorList;
  }
}

const majorConverter = {
  toFirestore: (major) => {
    return {
      majorId: major.majorId,
      name: major.name,
    };
  },
  fromFirestore: (snapshot, options) => {
    let d = snapshot.data(options);
    return new Major(snapshot.id, d.name);
  },
};
