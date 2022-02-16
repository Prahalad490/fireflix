import React, { useState } from "react";
import { NavBar } from "../components/index";
import "./styles/loginScreen.scss";
import SiginScreen from "./SiginScreen";

function LoginScreen() {
  const [signInScreenShow, setSignInScreenShow] = useState(false);
  return (
    <div
      className="login-screen"
      style={{
        background: `url("https://miro.medium.com/max/1400/1*5lyavS59mazOFnb55Z6znQ.png") center no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <NavBar signInButton setSignInScreenShow={setSignInScreenShow} />
      <div className="login-gradient" />
      {signInScreenShow ? (
        <SiginScreen />
      ) : (
        <div className="login-screen-body">
          <h1>Unlimited films, TV programmes and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <h3>
            Ready to Watch? Enter your email to create or restart your
            membership.{" "}
          </h3>
          <div className="login-screen-input">
            <form>
              <input type="email" placeholder="Email Address" />
              <button className="login-button">GET STARTED</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginScreen;
