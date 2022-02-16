import React, { useEffect, useState } from "react";
import { netflixUserLogo } from "../assets/index";
import "./styles/navBar.scss";
import ProfilePopUp from "./profilePopUp";

function NavBar({ signInButton = false, setSignInScreenShow }) {
  const [show, setShow] = useState(false);
  const [showProfilePopUp, setShowProfilePopUp] = useState(false);

  const transitionHandler = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionHandler);
    return () => window.removeEventListener("scroll", transitionHandler);
  }, []);

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <div className="nav-content">
        {/* <img
          className="netflix-logo"
          // src="https://pngimg.com/uploads/netflix/netflix_PNG25.png"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="netflixLogo"
        /> */}
        <h1 className="netflix-logo">FireFLIX</h1>

        {signInButton ? (
          <button
            className="nav-signin"
            onClick={() => setSignInScreenShow(true)}
          >
            Sign In
          </button>
        ) : (
          <>
            <div className="nav-links">
              <h3>Movies</h3>
              <h3>TV Shows</h3>
            </div>
            <img
              className="userLogo"
              src={netflixUserLogo}
              alt="netflixLogo"
              onClick={() => setShowProfilePopUp(!showProfilePopUp)}
            />
          </>
        )}
      </div>
      {showProfilePopUp && <ProfilePopUp />}
    </div>
  );
}

export default NavBar;
