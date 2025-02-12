import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, addDoc, getDocs, where, query} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAUPQf8GYES7n2ZQMx5Cosa1bDXvxiwVqk",
    authDomain: "expense-tracker-701df.firebaseapp.com",
    databaseURL: "https://expense-tracker-701df-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expense-tracker-701df",
    storageBucket: "expense-tracker-701df.firebasestorage.app",
    messagingSenderId: "13114654172",
    appId: "1:13114654172:web:d845d776f058ba21cce319"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

const db = getFirestore(app);

export {app, auth, db, getDoc, setDoc, updateDoc, deleteDoc, collection, addDoc, getDocs, doc, where, query}