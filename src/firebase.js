// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCgdFw8UKLB_VZc3f2MM_LG4m9YQTpS_mc",
    authDomain: "realtor2-app.firebaseapp.com",
    projectId: "realtor2-app",
    storageBucket: "realtor2-app.appspot.com",
    messagingSenderId: "211362095394",
    appId: "1:211362095394:web:57a80467c1af564c5c857b"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();






