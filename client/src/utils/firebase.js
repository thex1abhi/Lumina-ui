// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "lumina-ui.firebaseapp.com",
    projectId: "lumina-ui",
    storageBucket: "lumina-ui.firebasestorage.app",
    messagingSenderId: "134768916935",
    appId: "1:134768916935:web:2873bee2ea7623752301e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const provider = new GoogleAuthProvider()

export { auth, provider } 
