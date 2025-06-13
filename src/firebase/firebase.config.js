// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGToGqZVKjhob7NV8891cdK_oTOjvQo_g",
  authDomain: "course-management-auth.firebaseapp.com",
  projectId: "course-management-auth",
  storageBucket: "course-management-auth.firebasestorage.app",
  messagingSenderId: "5981024533",
  appId: "1:5981024533:web:5814408641d2534a9e391c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);