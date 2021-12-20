import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'

export const Database = (function(){
  var instance;

  function createInstance(){
    const firebaseConfig = {
      apiKey: "AIzaSyBsqkVJHuZceiLIpxplw61yL3hxdPbqJZY",
      authDomain: "beeportal-34f66.firebaseapp.com",
      projectId: "beeportal-34f66",
      storageBucket: "beeportal-34f66.appspot.com",
      messagingSenderId: "493766568940",
      appId: "1:493766568940:web:750e82a17968cb14f02ec9",
      measurementId: "G-FDX210NTTE"
    };

    return initializeApp(firebaseConfig);
  }

  return {
    getInstance: function(){
      if(instance == null) {
        instance = createInstance();
      }

      return getFirestore(instance);
    }
  }
})()