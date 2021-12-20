import { Firestore, collection, deleteDoc, doc, getDocs, getFirestore, query, where, limit } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'
import { Database } from './firebase.js'
import { UserFactory } from '../factory/userFactory.js'

export class User {
  
  constructor(userId, email, password, name, role){
    this.userId = userId
    this.email = email
    this.password = password
    this.name = name
    this.role = role
  }

  static async getUserByEmailAndPassword(email, password) {
    const db = Database.getInstance()
    const userRef = collection(db, "user")

    const querySnapshot = query(
      userRef, where("email", "==", email),
      where("password", "==", password),
      limit(1)
    ).withConverter(userConverter)

    const data = await getDocs(querySnapshot);
    const userList = data.docs.map((doc) => doc.data())
    
    return userList

  }

  async getAllUsers(){
    const db = Database.getInstance()

    const querySnapshot = query(
      collection(db, "user")
    ).withConverter(userConverter)

    const data = await getDocs(querySnapshot);
    const userList = data.docs.map((doc) => doc.data())

    return userList
  }

}

export class Student extends User{
  
  constructor(userId, email, password, name, role, studentId, majorId, semester){
    super(userId, email, password, name, role)
    this.studentId = studentId;
    this.majorId = majorId;
    this.semester = semester;
  }
}

export class Lecturer extends User{
  
  constructor(userId, email, password, name, role, lecturerId){
    super(userId, email, password, name, role)
    this.lecturerId = lecturerId
  }
}

const userConverter = {
  toFirestore: (user) => {
    return {
      userId : user.userId,
      email : user.email,
      password : user.password,
      name : user.name,
      role : user.role,
    };
  },
  fromFirestore: (snapshot, options) => {
    let uf = new UserFactory()
    let d = snapshot.data(options);
    if(d.role == "student"){
      return uf.createStudent(snapshot.id, d.email, d.password, d.name, d.role, d.studentId, d.majorId, d.semester)
    }else if(d.role == "lecturer"){
      return uf.createLecturer(snapshot.id, d.email, d.password, d.name, d.role, d.lecturerId)
    }else{
      return new UserFactory().create(
        snapshot.id, d.email, d.password, d.name, d.role
      )
    }
  }
}