// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW0neijQFr8_JavPcJNPojKOQEtcvZqnI",
  authDomain: "furniture-465fc.firebaseapp.com",
  projectId: "furniture-465fc",
  storageBucket: "furniture-465fc.firebasestorage.app",
  messagingSenderId: "8096668081",
  appId: "1:8096668081:web:506090587222511a6e4590",
  measurementId: "G-SKNZVEJDLB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
