// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvUFc2Dy-T05N5AmriK9_rcH0AcjEA7Qs",
  authDomain: "tesautentication.firebaseapp.com",
  projectId: "tesautentication",
  storageBucket: "tesautentication.appspot.com",
  messagingSenderId: "1081200014238",
  appId: "1:1081200014238:web:de5be715f42931707f1c8f",
  measurementId: "G-812BVCSSX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };