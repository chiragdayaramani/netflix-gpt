// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD2ic7deoWvfePZAPxF6cK7fsMiD9o4-E",
  authDomain: "netflix-gpt-754b0.firebaseapp.com",
  projectId: "netflix-gpt-754b0",
  storageBucket: "netflix-gpt-754b0.firebasestorage.app",
  messagingSenderId: "545375841788",
  appId: "1:545375841788:web:639726d54a6bcff625d679",
  measurementId: "G-KMFQB63Y7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);    

export const auth = getAuth();