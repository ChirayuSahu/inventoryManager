import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, addDoc, getDocs, where, query} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DB_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

const db = getFirestore(app);

export {app, auth, db, getDoc, setDoc, updateDoc, deleteDoc, collection, addDoc, getDocs, doc, where, query}