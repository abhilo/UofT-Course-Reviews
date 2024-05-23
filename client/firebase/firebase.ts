// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZNk-IRdSjuctB91bRE6kRZI9UT1ePw4c",
  authDomain: "directory-cf394.firebaseapp.com",
  projectId: "directory-cf394",
  storageBucket: "directory-cf394.appspot.com",
  messagingSenderId: "96779333798",
  appId: "1:96779333798:web:53e208ce02866287388467",
  measurementId: "G-D3J5T4R02S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
