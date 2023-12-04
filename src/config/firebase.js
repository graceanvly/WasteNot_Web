
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD6QfjZ3kiDgfDBJ3k0OoS6CSjwCVysM_A",
  authDomain: "wastenot-4f8dd.firebaseapp.com",
  projectId: "wastenot-4f8dd",
  storageBucket: "wastenot-4f8dd.appspot.com",
  messagingSenderId: "755864780516",
  appId: "1:755864780516:web:c152789fb3cf91a8ffb6f1",
  measurementId: "G-PJ1GZ1FRFQ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const imageDB = getStorage(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, imageDB, storage };
// const analytics = getAnalytics(app);