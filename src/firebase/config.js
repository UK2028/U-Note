import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDrsZ1FRYQ8na8qZ-DfC6KKAmqRUnUnR9Q",
  authDomain: "u-note-cc43c.firebaseapp.com",
  projectId: "u-note-cc43c",
  storageBucket: "u-note-cc43c.appspot.com",
  messagingSenderId: "490935737048",
  appId: "1:490935737048:web:ca8a5e45a6e894696155ad"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const colRef = collection(db,"notes");
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();