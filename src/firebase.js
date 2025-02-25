// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDN8XARrkV7kVndRsw-RfeflBShf8e6goQ",
    authDomain: "todo-dc40c.firebaseapp.com",
    projectId: "todo-dc40c",
    storageBucket: "todo-dc40c.firebasestorage.app",
    messagingSenderId: "677760869695",
    appId: "1:677760869695:web:029b1ad253b7279bdd5f8a",
    measurementId: "G-0E8CF56Z4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);