import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: process.env.APIKEY,
//     authDomain: process.env.AUTHDOMAIN,
//     projectId: process.env.PROJECTID,
//     storageBucket: process.env.STORAGEBUCKET,
//     messagingSenderId: process.env.MESSAGINGSENDERID,
//     appId: process.env.APPID,
//   };
  
const firebaseConfig = {
  apiKey: "AIzaSyAIgobReL0yJGEaTvHBF4ZQoONSFx3N-vQ",
  authDomain: "emilweb-3181b.firebaseapp.com",
  projectId: "emilweb-3181b",
  storageBucket: "emilweb-3181b.appspot.com",
  messagingSenderId: "935409700061",
  appId: "1:935409700061:web:6c2729b111473f7d4c9f34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };
