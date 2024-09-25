// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWuh_0qOIIjtGuFeH5UYtxXhnN3mI17ak",
  authDomain: "my-auth-844cb.firebaseapp.com",
  projectId: "my-auth-844cb",
  storageBucket: "my-auth-844cb.appspot.com",
  messagingSenderId: "975177927837",
  appId: "1:975177927837:web:d5b33841b1c5ce80a7d874",
  measurementId: "G-RJLRCZF4QH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
