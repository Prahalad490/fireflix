import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { NavBar, Loader } from "../components/index";
import { netflixUserLogo } from "../assets/index";
import { imageUpload } from "../utils/imageUpload";

import { useSelector, useDispatch } from "react-redux";
import { userSelect, updateImage } from "../features/user/userSlice";

import { db } from "../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import "./styles/profileScreen.scss";

function ProfileScreen() {
  const user = useSelector(userSelect);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const docRef = doc(db, "users", user.uid);

    const snapshot = onSnapshot(docRef, (snapshot) => {
      dispatch(
        updateImage({
          imageUrl: snapshot.data().imageUrl,
        })
      );
    });
    setIsLoading(false);
    return snapshot;
  }, [dispatch, user.uid]);

  const onchangefileHandler = async (e) => {
    setIsLoading(true);
    await imageUpload(user.email, e.target.files[0]);
    setIsLoading(false);
  };

  return (
    <div className="profile-container">
      <NavBar />
      <div>
        <div className="profile-grid-container">
          <div className="profile-grid-body-img-container">
            {isLoading ? (
              <div className="loader-container">
                <CircularProgress sx={{ color: "red" }} />
              </div>
            ) : (
              <img
                src={user.imageUrl ? user.imageUrl : netflixUserLogo}
                alt="profile dp"
              />
            )}
            <input
              type="file"
              class="custom-file-input"
              onChange={onchangefileHandler}
            />
          </div>
          <div className="profile-grid-body-desp-container">
            <h4>Account email</h4>
            <h3>{user.email}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
