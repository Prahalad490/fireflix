import React, { useEffect, useState } from "react";
import { netflixUserLogo } from "../assets/index";
import "./styles/navBar.scss";
import ProfilePopUp from "./profilePopUp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { userSelect } from "../features/user/userSlice";

import { SearchPopUp } from "./index";
import { Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar({ signInButton = false, setSignInScreenShow }) {
  const [show, setShow] = useState(false);
  const [showProfilePopUp, setShowProfilePopUp] = useState(false);

  const [showSearchScreen, setShowSearchScreen] = useState(false);

  console.log("showProfilePopUp", showProfilePopUp);
  console.log("showSearchScreen", showSearchScreen);
  const user = useSelector(userSelect);

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
    <>
      <div className={`nav ${show && "nav-black"}`}>
        <div className="nav-content">
          {/* <img
          className="netflix-logo"
          // src="https://pngimg.com/uploads/netflix/netflix_PNG25.png"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="netflixLogo"
        /> */}
          <Link to={"/"}>
            <h1 className="netflix-logo">FireFLIX</h1>
          </Link>

          {signInButton ? (
            <button
              className="nav-signin"
              onClick={() => setSignInScreenShow(true)}
            >
              Sign In
            </button>
          ) : (
            <>
              {/* <div className="nav-links">
                
                
              </div> */}
              <p className="movie-nav-link">Movies</p>
              <p className="tv-nav-link">TV Shows</p>
              <div
                className="menuIcon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSearchScreen(true);
                }}
              >
                <MenuIcon />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSearchScreen(true);
                }}
                className="nav-search"
              >
                <Search />
                <p>Search</p>
              </button>
              <img
                className="userLogo"
                src={user.imageUrl ? user.imageUrl : netflixUserLogo}
                alt="netflixLogo"
                onClick={() => setShowProfilePopUp(!showProfilePopUp)}
              />
            </>
          )}
        </div>

        <ProfilePopUp
          setShowProfilePopUp={setShowProfilePopUp}
          showProfilePopUp={showProfilePopUp}
        />

        <SearchPopUp
          showSearchScreen={showSearchScreen}
          setShowSearchScreen={setShowSearchScreen}
        />
      </div>
    </>
  );
}

export default NavBar;
