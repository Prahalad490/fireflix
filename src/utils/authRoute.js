import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoginScreen from "../pages/LoginScreen";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, userSelect } from "../features/user/userSlice";
import { Loader } from "../components/index";

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
