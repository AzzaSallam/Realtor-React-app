// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwoxHUQi_MfFXIZHAZZHbPiX96BY_3XDM",
    authDomain: "realtor-react-app-3571f.firebaseapp.com",
    projectId: "realtor-react-app-3571f",
    storageBucket: "realtor-react-app-3571f.appspot.com",
    messagingSenderId: "839832346682",
    appId: "1:839832346682:web:148ce606f74872dc0a1503"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();