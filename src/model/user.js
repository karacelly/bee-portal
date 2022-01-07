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
  limit,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { Database } from "./firebase.js";
import { UserFactory } from "../factory/userFactory.js";

export class User {
  constructor(userId, email, password, name, role) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
  }

  static async get(userId) {
    const data = await getDoc(
      doc(Database.getInstance(), "user", userId).withConverter(userConverter)
    ).catch((err) => {
      console.log(err);
    });
    return data.data();
  }

  static async getUserByEmailAndPassword(email, password) {
    const db = Database.getInstance();
    const userRef = collection(db, "user");

    const querySnapshot = query(
      userRef,
      where("email", "==", email),
      where("password", "==", password),
      limit(1)
    ).withConverter(userConverter);

    const data = await getDocs(querySnapshot);
    const userList = data.docs.map((doc) => doc.data());

    return userList;
  }

  static async getAll() {
    const db = Database.getInstance();

    const querySnapshot = query(collection(db, "user")).withConverter(
      userConverter
    );

    const data = await getDocs(querySnapshot);
    const userList = data.docs.map((doc) => doc.data());

    return userList;
  }

  static async getAllStudents() {
    const db = Database.getInstance();

    const querySnapshot = query(
      collection(db, "user"),
      where("role", "==", "Student")
    ).withConverter(userConverter);

    const data = await getDocs(querySnapshot);
    const userList = data.docs.map((doc) => doc.data());

    return userList;
  }

  static async getAllAvailableProctors() {
    const db = Database.getInstance();

    const querySnapshot = query(
      collection(db, "user"),
      where("role", "==", "Lecturer"),
      where("isProctor", "==", true),
      where("isAvailable", "==", true)
    ).withConverter(userConverter);

    const data = await getDocs(querySnapshot);
    const userList = data.docs.map((doc) => doc.data());

    return userList;
  }

  static async getAllLecturers() {
    const db = Database.getInstance();

    const querySnapshot = query(
      collection(db, "user"),
      where("role", "==", "Lecturer")
    ).withConverter(userConverter);

    const data = await getDocs(querySnapshot);
    const userList = data.docs.map((doc) => doc.data());

    return userList;
  }
}

export class Student extends User {
  constructor(
    userId,
    email,
    password,
    name,
    role,
    studentId,
    majorId,
    semester
  ) {
    super(userId, email, password, name, role);
    this.studentId = studentId;
    this.majorId = majorId;
    this.semester = semester;
  }
}

export class Lecturer extends User {
  constructor(userId, email, password, name, role, lecturerId, isProctor) {
    super(userId, email, password, name, role);
    this.lecturerId = lecturerId;
    this.isProctor = isProctor;
  }
}

export class Proctor extends Lecturer {
  constructor(
    userId,
    email,
    password,
    name,
    role,
    lecturerId,
    isProctor,
    isAvailable
  ) {
    super(userId, email, password, name, role);
    this.lecturerId = lecturerId;
    this.isProctor = isProctor;
    this.isAvailable = isAvailable;
  }

  static async setProctorAvailability(userId, isAvailable) {
    try {
      await updateDoc(doc(Database.getInstance(), "user", userId), {
        isAvailable: isAvailable,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const userConverter = {
  toFirestore: (user) => {
    return {
      userId: user.userId,
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
    };
  },
  fromFirestore: (snapshot, options) => {
    let uf = new UserFactory();
    let d = snapshot.data(options);
    if (d.role == "Student") {
      return uf.createStudent(
        snapshot.id,
        d.email,
        d.password,
        d.name,
        d.role,
        d.studentId,
        d.majorId,
        d.semester
      );
    } else if (d.role == "Lecturer" && d.isProctor == false) {
      return uf.createLecturer(
        snapshot.id,
        d.email,
        d.password,
        d.name,
        d.role,
        d.lecturerId,
        d.isProctor
      );
    } else if (d.role == "Lecturer" && d.isProctor == true) {
      return uf.createProctor(
        snapshot.id,
        d.email,
        d.password,
        d.name,
        d.role,
        d.lecturerId,
        d.isProctor,
        d.isAvailable
      );
    } else {
      return new UserFactory().create(
        snapshot.id,
        d.email,
        d.password,
        d.name,
        d.role
      );
    }
  },
};
