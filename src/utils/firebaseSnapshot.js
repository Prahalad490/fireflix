import {
  query,
  getDocs,
  where,
  doc,
  addDoc,
  collection,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "./firebase";

import { useDispatch, useSelector } from "react-redux";
import { login, logout, userSelect } from "../features/user/userSlice";

export const imageSnapshot = (id) => {
  try {
    // const dispatch = useDispatch();
    const docRef = doc(db, "users", id);
    // let data;
    onSnapshot(docRef, (snapshot) => {
      //   console.log(imageUrl);
      //   return imageUrl;
      //   snapshot.forEach(function (doc) {
      //   data.push(imageUrl);
      //   });
    });
    // return data;
    // querySnapshot.forEach(function(doc) {
    //     cities.push(doc.data());
    // });
    // return data;
  } catch (err) {
    alert(err.message);
  }
};
