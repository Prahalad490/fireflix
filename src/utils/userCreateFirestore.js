import { addDoc, setDoc, doc, collection } from "firebase/firestore";
import { db } from "./firebase";

export const createUser = async (email, id) => {
  try {
    // const userCollectionRef = collection(db, "users");
    // return await addDoc(userCollectionRef, {
    //   email: email,
    //   imageUrl: "",
    // });
    const docRef = doc(db, "users", id);
    return await setDoc(docRef, {
      email: email,
      imageUrl: "",
    });
  } catch (err) {
    alert(err.message);
  }
};
