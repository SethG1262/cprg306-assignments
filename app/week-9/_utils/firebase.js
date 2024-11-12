// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvDgWp3sYopvkpbeURu1XQcxEXCATBs3w",
    authDomain: "cprg306-assignments-29c5b.firebaseapp.com",
    projectId: "cprg306-assignments-29c5b",
    storageBucket: "cprg306-assignments-29c5b.firebasestorage.app",
    messagingSenderId: "640788307808",
    appId: "1:640788307808:web:d7dd9abfee24903682c805",
    measurementId: "G-NQGH35TPJZ"
  };
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);