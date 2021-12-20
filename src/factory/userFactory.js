import { User, Student, Lecturer } from '../model/user.js'

export function UserFactory(){
  this.create = (userId, email, password, name, role) =>{
    return new User(userId, email, password, name, role)
  }

  this.createStudent = (userId, email, password, name, role, studentId, majorId, semester) => {
    return new Student(userId, email, password, name, role, studentId, majorId, semester)
  }

  this.createLecturer = (userId, email, password, name, role, lecturerId) => {
    return new Lecturer(userId, email, password, name, role, lecturerId)
  }
}