import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = process.env.REACT_APP_FIREBASE;

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage, db };
