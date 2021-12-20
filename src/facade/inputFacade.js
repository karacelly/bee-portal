import { userController } from '../controller/userController.js'

export class inputFacade{
  constructor(){
  }
  
  async authUser(){
    console.log("authUser")
    let email = document.getElementById("email");
    let pass = document.getElementById("password-field");

    var error = document.getElementById("error")
    let returnVal = await userController.auth(email.value, pass.value)
    console.log(returnVal)
    if(returnVal == false){
      error.textContent = "Credential invalid!"
      error.style.color = "red"
    }else{
      error.textContent = ""
      localStorage.setItem('user', returnVal[0].userId)
      console.log(localStorage.getItem('user'))
      window.location.assign('./dashboard.html')
    }
  }
}

