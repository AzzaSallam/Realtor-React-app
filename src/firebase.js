// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDdP6HvBCLzwhDPHy-FuQjKpOf7OuCfwfM",
    authDomain: "react-realtor512.firebaseapp.com",
    projectId: "react-realtor512",
    storageBucket: "react-realtor512.appspot.com",
    messagingSenderId: "620538418031",
    appId: "1:620538418031:web:af7f6cf74552eef2330e9a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();






