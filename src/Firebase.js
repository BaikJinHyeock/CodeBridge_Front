// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXboHvm_RmDStzv59CiM47rczfFvtj4Ws",
    authDomain: "codebridge-969ab.firebaseapp.com",
    projectId: "codebridge-969ab",
    storageBucket: "codebridge-969ab.appspot.com",
    messagingSenderId: "490091530786",
    appId: "1:490091530786:web:34873e7eb5c0ee4e78587b",
    measurementId: "G-ZHWPH41QVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
const analytics = getAnalytics(app);