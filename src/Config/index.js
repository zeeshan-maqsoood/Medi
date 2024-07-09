// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiA4lwz5ufzakiLI0F0W3iIwJAisiq7eE",
  authDomain: "studymate-c1c09.firebaseapp.com",
  projectId: "studymate-c1c09",
  storageBucket: "studymate-c1c09.appspot.com",
  messagingSenderId: "387714907375",
  appId: "1:387714907375:web:34ee0cff84a4c96a7aef1a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { app, analytics, messaging };
