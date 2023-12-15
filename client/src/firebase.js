// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCuPls3i2pZCU9j_876UsNF3pT5Dmgxmw0",
  authDomain: "video-dd451.firebaseapp.com",
  projectId: "video-dd451",
  storageBucket: "video-dd451.appspot.com",
  messagingSenderId: "22154102917",
  appId: "1:22154102917:web:5d24e83715c4ae596741ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider =new GoogleAuthProvider()
export default app