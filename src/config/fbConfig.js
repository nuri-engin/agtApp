import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwZXUROiZ1c79rah-HCHaea1JSusPDXO0",
  authDomain: "antalya-gida-toplulugu.firebaseapp.com",
  databaseURL: "https://antalya-gida-toplulugu.firebaseio.com",
  projectId: "antalya-gida-toplulugu",
  storageBucket: "antalya-gida-toplulugu.appspot.com",
  messagingSenderId: "245722506287",
  appId: "1:245722506287:web:e00d48bef33f0d7bdb12da",
  measurementId: "G-GN4SZHY279"
};

firebase.initializeApp(firebaseConfig);
export default firebase;

//DB Rules sample 
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /projects/{project} {
//       allow read, write: if request.auth.uid != null;
//     }
    
//     match /users/{userId} {
//     	allow create
// 	    allow read: if request.auth.uid != null
//   	  allow write: if request.auth.uid == userId
//     }
    
//     match /notifications/{notification} {
//       allow read: if request.auth.uid != null;
//     }
//   }
// }
