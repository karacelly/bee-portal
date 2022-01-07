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
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { Database } from "./firebase.js";

export class Assignment {
  constructor(
    assignmentId,
    classId,
    assignmentType,
    deadlineDate,
    assignmentQuestion
  ) {
    this.assignmentId = assignmentId;
    this.classId = classId;
    this.assignmentType = assignmentType;
    this.deadlineDate = deadlineDate;
    this.assignmentQuestion = assignmentQuestion;
  }

  static async insert() {
    try {
      const docIns = await addDoc(
        collection(Database.getInstance(), "assignment"),
        {
          classId: this.classId,
          assignmentType: this.assignmentType,
          deadlineDate: new Timestamp(
            new Date(this.submissionDate).getTime() / 1000,
            0
          ),
          assignmentQuestion: this.assignmentQuestion,
        }
      );
      return {
        assignmentId: docIns.id,
        classId: this.classId,
        assignmentType: this.assignmentType,
        deadlineDate: this.deadlineDate,
        assignmentQuestion: this.assignmentQuestion,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async get(assignmentId) {
    const data = await getDoc(
      doc(Database.getInstance(), "assignment", assignmentId).withConverter(
        assignmentConverter
      )
    );
    return data.data();
  }

  static async getAllPersonalAssignment() {
    const db = Database.getInstance();
    const assignmentRef = collection(db, "assignment");

    const querySnapshot = query(
      assignmentRef,
      where("assignmentType", "==", "Personal")
    ).withConverter(assignmentConverter);

    const data = await getDocs(querySnapshot);
    const assignmentList = data.docs.map((doc) => doc.data());

    return assignmentList;
  }

  static async getAllGroupAssignment() {
    const db = Database.getInstance();
    const assignmentRef = collection(db, "assignment");

    const querySnapshot = query(
      assignmentRef,
      where("assignmentType", "==", "Group")
    ).withConverter(assignmentConverter);

    const data = await getDocs(querySnapshot);
    const assignmentList = data.docs.map((doc) => doc.data());

    return assignmentList;
  }
}

const assignmentConverter = {
  toFirestore: (assignment) => {
    return {
      assignmentId: assignment.assignmentId,
      classId: assignment.classId,
      assignmentType: assignment.assignmentType,
      deadlineDate: assignment.deadlineDate,
      assignmentQuestion: assignment.assignmentQuestion,
    };
  },
  fromFirestore: (snapshot, options) => {
    let d = snapshot.data(options);
    return new Assignment(
      snapshot.id,
      d.classId,
      d.assignmentType,
      d.deadlineDate,
      d.assignmentQuestion
    );
  },
};
