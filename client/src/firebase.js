// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCQW4GPUEN3-u6jVmWBAcSF7lpqr7YN0DA",
    authDomain: "eventmanagenment.firebaseapp.com",
    projectId: "eventmanagenment",
    storageBucket: "eventmanagenment.firebasestorage.app",
    messagingSenderId: "1092282726690",
    appId: "1:1092282726690:web:73f98cb8fa9f3e6ef90d7b",
    measurementId: "G-LF1812PC3D"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
