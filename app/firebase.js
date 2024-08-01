// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Required for side-effects
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9ypP-iPPtC55uZsg0PH95j1M3bzi0mQU",
  authDomain: "pantry-management-system-b61ae.firebaseapp.com",
  projectId: "pantry-management-system-b61ae",
  storageBucket: "pantry-management-system-b61ae.appspot.com",
  messagingSenderId: "630419037935",
  appId: "1:630419037935:web:1d4cb52ef2f3547a95851a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);