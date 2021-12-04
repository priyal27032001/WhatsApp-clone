import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDZS3g543y4Q0nOdMGRza83BY0swkyt0Vo",
    authDomain: "whatsapp-clone-993ed.firebaseapp.com",
    projectId: "whatsapp-clone-993ed",
    storageBucket: "whatsapp-clone-993ed.appspot.com",
    messagingSenderId: "954551965592",
    appId: "1:954551965592:web:d2090aab4c38ff95e2fded",
    measurementId: "G-TT71S6WTE6"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;