import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyD1xRBGhjcVgLOyBYL63D327YQHktVQ5SM",
  authDomain: "final-year-project-b1ebf.firebaseapp.com",
  databaseURL: "https://final-year-project-b1ebf-default-rtdb.firebaseio.com",
  projectId: "final-year-project-b1ebf",
  storageBucket: "final-year-project-b1ebf.appspot.com",
  messagingSenderId: "1031739619080",
  appId: "1:1031739619080:web:1997059912e459f1325ebd",
  measurementId: "G-3BF25HGXX7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app)
export default app;