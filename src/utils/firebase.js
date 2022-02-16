import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaLMxqgw3KfO1MgWpTc8Ub2W3EvUSqfis",
  authDomain: "netfilx-clone-5ba3a.firebaseapp.com",
  projectId: "netfilx-clone-5ba3a",
  storageBucket: "netfilx-clone-5ba3a.appspot.com",
  messagingSenderId: "331926714741",
  appId: "1:331926714741:web:c29ffba266ea6046c33b3c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export default db;
