import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCYew30qxSeB3_81TgiEbLRBqz-uUjK-c",
  authDomain: "bookings-461d6.firebaseapp.com",
  projectId: "bookings-461d6",
  storageBucket: "bookings-461d6.firebasestorage.app",
  messagingSenderId: "682967419259",
  appId: "1:682967419259:web:1db8b1b50095f03518d5de",
  measurementId: "G-78215T6V6Y"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
