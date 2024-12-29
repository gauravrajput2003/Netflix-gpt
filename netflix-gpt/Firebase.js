// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9x-Pe81qmFHJ5JZtk83T8W0QFlg7dQhU",
  authDomain: "netflix-gpt-62db9.firebaseapp.com",
  projectId: "netflix-gpt-62db9",
  storageBucket: "netflix-gpt-62db9.firebasestorage.app",
  messagingSenderId: "489367331285",
  appId: "1:489367331285:web:e35fcbec8a6bb23f491d5c",
  measurementId: "G-Q1MSVFQ766"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();
