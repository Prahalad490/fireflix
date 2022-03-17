import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoginScreen from "../pages/LoginScreen";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  userSelect,
  updateImage,
} from "../features/user/userSlice";
import { Loader } from "../components/index";

import { doc, onSnapshot } from "firebase/firestore";

function AuthRoute() {
  const isAuth = useSelector(userSelect);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (userAuth) => {
      setIsLoading(true);
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
        const docRef = doc(db, "users", userAuth.uid);

        onSnapshot(docRef, (snapshot) => {
          dispatch(
            updateImage({
              imageUrl: snapshot.data().imageUrl,
            })
          );
        });
      } else {
        dispatch(logout);
      }
      setIsLoading(false);
    });

    return unSubscribe;
  }, [dispatch]);
  return isLoading ? <Loader /> : isAuth ? <Outlet /> : <LoginScreen />;
}

export default AuthRoute;
