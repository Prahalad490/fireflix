import React, { useEffect, useRef } from "react";
import "./styles/profilePopUp.scss";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";

function ProfilePopUp({ showProfilePopUp, setShowProfilePopUp }) {
  const popUpRef = useRef(null);

  const signOutHandle = () => {
    signOut(auth);
    window.location.reload();
    setShowProfilePopUp(false);
  };

  return (
    <Modal
      open={showProfilePopUp}
      onClose={() => setShowProfilePopUp(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div ref={popUpRef} className="profile-pop-up-container">
        <Link to={`/profile`}>
          <p className="profile-menu-item">Profile Settings</p>
        </Link>
        <p className="profile-menu-item" onClick={() => signOutHandle()}>
          Sign Out
        </p>
      </div>
    </Modal>
  );
}

export default ProfilePopUp;
