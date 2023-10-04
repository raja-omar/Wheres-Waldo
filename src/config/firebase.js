import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyCSfU5GPnt_HI0KWn4xhArEof_f08TSH4Y",
    authDomain: "where-s-waldo-427dc.firebaseapp.com",
    projectId: "where-s-waldo-427dc",
    storageBucket: "where-s-waldo-427dc.appspot.com",
    messagingSenderId: "853835491085",
    appId: "1:853835491085:web:61d06009a0732a61ef7244",
    measurementId: "G-42TCRP8DE1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);