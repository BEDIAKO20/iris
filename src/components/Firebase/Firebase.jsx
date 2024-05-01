// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore}from  'firebase/firestore'
import {getStorage}from  'firebase/storage'
import {getAnalytics}from  'firebase/analytics'





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY0kBYsWpHxNZYeDagyjsDJcRhO2BaIe4",
  authDomain: "irin-crafting-elegance.firebaseapp.com",
  projectId: "irin-crafting-elegance",
  storageBucket: "irin-crafting-elegance.appspot.com",
  messagingSenderId: "29496830479",
  appId: "1:29496830479:web:fbc4553020d47bb9b6d17a",
  measurementId: "G-JQM22SRXTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app);
