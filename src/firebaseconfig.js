// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrEDnoT4iDwdiu97o8BCIaqvaNVdreXXc",
  authDomain: "task-manager-react-ab8cb.firebaseapp.com",
  projectId: "task-manager-react-ab8cb",
  storageBucket: "task-manager-react-ab8cb.appspot.com",
  messagingSenderId: "86013959143",
  appId: "1:86013959143:web:5954faaf8beb29960e3b42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;