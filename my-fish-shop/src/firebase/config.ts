// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // أضفنا استيراد الـ Auth

const firebaseConfig = {
  apiKey: "AIzaSyD5FU2qael_6US7X5tykY3OT5iT2uGquhE",
  authDomain: "my-fish-shop-cca2a.firebaseapp.com",
  projectId: "my-fish-shop-cca2a",
  storageBucket: "my-fish-shop-cca2a.firebasestorage.app",
  messagingSenderId: "1073414512284",
  appId: "1:1073414512284:web:776e62e839daa93e6ad759",
  measurementId: "G-ZW06QCE5S8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = getAuth(app); // أضفنا تصدير الـ Auth عشان تسجيل الدخول