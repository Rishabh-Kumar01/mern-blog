// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-33324.firebaseapp.com",
  projectId: "mern-blog-33324",
  storageBucket: "mern-blog-33324.appspot.com",
  messagingSenderId: "833367683670",
  appId: "1:833367683670:web:bdd111e6c829d4232b41f7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
