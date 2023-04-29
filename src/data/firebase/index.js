import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByhM0fNtH3KWon7z58CK0vpOPtsP2dQ_s",
  authDomain: "invoices-74d95.firebaseapp.com",
  projectId: "invoices-74d95",
  storageBucket: "invoices-74d95.appspot.com",
  messagingSenderId: "440628235136",
  appId: "1:440628235136:web:6b6ed171fb7f81661acf65",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, collection };
