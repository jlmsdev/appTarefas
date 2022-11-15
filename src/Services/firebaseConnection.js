import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyATtJsbHWAnQgltxfjiq-eMkanAZaScMy0",
  authDomain: "listatarefas-c1c02.firebaseapp.com",
  projectId: "listatarefas-c1c02",
  storageBucket: "listatarefas-c1c02.appspot.com",
  messagingSenderId: "13628915387",
  appId: "1:13628915387:web:15fb5e06aac6444f9f739e",
  measurementId: "G-Z75BHEJMRQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const banco = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { banco, auth }
