import { User } from '../model/user.js'

export class userController{

  constructor(){}

  static async auth(email, password){ 
    return await User.getUserByEmailAndPassword(email, password)
  }
}