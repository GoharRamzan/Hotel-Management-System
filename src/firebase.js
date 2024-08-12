import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1GiL-8dugv3-8TI6Fnq5gJPZaXqKgF4I",
  authDomain: "hospital-management-367e1.firebaseapp.com",
  projectId: "hospital-management-367e1",
  storageBucket: "hospital-management-367e1.appspot.com",
  messagingSenderId: "438914177039",
  appId: "1:438914177039:web:0d064bef320bb5beb5eb7a"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };