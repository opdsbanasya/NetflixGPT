// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChXfScgI5IM6-qp0uMlmEhITXsoaf81wM",
    authDomain: "netflixgpt-ec55f.firebaseapp.com",
    projectId: "netflixgpt-ec55f",
    storageBucket: "netflixgpt-ec55f.appspot.com",
    messagingSenderId: "112224933409",
    appId: "1:112224933409:web:30e555275462ffaedeb560",
    measurementId: "G-60KVVTRYWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();