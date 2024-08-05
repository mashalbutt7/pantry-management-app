// app/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
import { getFirestore } from "firebase/firestore"; // Import getFirestore for Firestore

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

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
