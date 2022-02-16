import React, { useState } from "react";
import "./styles/signinScreen.scss";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function SiginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpClicked, setSignUpClicked] = useState(false);

  const handleSubmit = (e, signUpClicked) => {
    e.preventDefault();
    if (signUpClicked) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => console.log(res))
        .catch((error) => {
          alert(error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => console.log(res))
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const toggleFunctionality = () => {
    setSignUpClicked(!signUpClicked);
    setEmail("");
    setPassword("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="signin-screen">
      <h1>{signUpClicked ? "Sign Up" : "Sign In"}</h1>
      <form
        className="signin-form"
        onSubmit={(e) => handleSubmit(e, signUpClicked)}
      >
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div>
          <input className="checkbox" type="checkbox" /> Accept Term and
          Conditions
        </div>
        <button>{signUpClicked ? "Sign Up" : "Sign In"}</button>
      </form>
      <h4>
        <span className="span1">
          {signUpClicked ? "already registered ?" : "New to FireFlix ?"}
        </span>{" "}
        <span className="span2" onClick={() => toggleFunctionality()}>
          {signUpClicked ? "Sign In." : "Sign Up Now."}
        </span>
      </h4>
    </div>
  );
}

export default SiginScreen;
