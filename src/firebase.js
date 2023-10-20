// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA-uL4Ym9a3NPJgcMPVaWCQxFDl9jnEmCw",
  authDomain: "final-realtor.firebaseapp.com",
  projectId: "final-realtor",
  storageBucket: "final-realtor.appspot.com",
  messagingSenderId: "985802056032",
  appId: "1:985802056032:web:e673cadb341b4cf0b4fe05",
  measurementId: "G-QB3RPRTSSR"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();






