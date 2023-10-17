// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAQGwrhaQyimdpCRZeQ1i1BOih3ko0D8tc",
    authDomain: "realtor-app-d0cce.firebaseapp.com",
    projectId: "realtor-app-d0cce",
    storageBucket: "realtor-app-d0cce.appspot.com",
    messagingSenderId: "425977456161",
    appId: "1:425977456161:web:70736ccec3f67387b6e560",
    measurementId: "G-6BK1XD564K"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();



