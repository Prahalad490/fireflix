import {
  query,
  getDocs,
  where,
  doc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "./firebase";

export const imageUpload = async (email, data) => {
  try {
    const storageRef = ref(storage, `images/${data.name}`);

    await uploadBytes(storageRef, data)
      .then(() => getDownloadURL(storageRef))
      .then(async (url) => {
        let userFoundId;

        const userCollectionRef = collection(db, "users");

        // find the user exist
        const q = query(userCollectionRef, where("email", "==", email));

        const findUserResponse = await getDocs(q);

        findUserResponse.forEach((doc) => {
          userFoundId = doc.id;
        });

        if (!userFoundId) {
          return addDoc(userCollectionRef, {
            email: email,
            imageUrl: url,
            imageName: data.name,
          });
        } else {
          return updateDoc(doc(db, "users", userFoundId), {
            imageUrl: url,
          });
        }
      });
  } catch (err) {
    alert(err);
  }
};
