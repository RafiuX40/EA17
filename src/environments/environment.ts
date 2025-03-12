// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  production: false,
  apiKey: "AIzaSyDrJxwE5a8PddeJQM6kdN5zUiRwBaY2QyI",
  authDomain: "ideamanager-9303c.firebaseapp.com",
  projectId: "ideamanager-9303c",
  storageBucket: "ideamanager-9303c.firebasestorage.app",
  messagingSenderId: "728280101389",
  appId: "1:728280101389:web:cfc8afd13735606be1db44",
  measurementId: "G-2PH223GJDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);