import "./signin.css";
import React, { useState } from "react";
import axios from "axios";

const Signin = ({ setShowSigninModal, setIsCreated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const signInHandler = async (e) => {
    e.preventDefault();

    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    try {
      await axios.post("http://localhost:8080/api/accounts/signin", {
        firstName,
        lastName,
        email,
        password,
      });
      setIsCreated(true);
    } catch (error) {
      const err = error.response.data.errors;

      if (err instanceof Object) {
        if (err.firstName) {
          setFirstNameError(err.firstName);
        }
        if (err.lastName) {
          setLastNameError(err.lastName);
        }
        if (err.email) {
          setEmailError(err.email);
        }
        if (err.password) {
          setPasswordError(err.password);
        }
      } else if (err && err.includes("email")) {
        setEmailError(err);
      } else {
        setErrorMsg(err);
      }
    }
  };

  return (
    <>
      <div className="overlay">
        <form className="modal" onSubmit={signInHandler}>
          <h3 className="modal-title">Sign in</h3>
          <div onClick={() => setShowSigninModal(false)}>
            <div className="close-modal">
              <span>X</span>
            </div>
          </div>
          {errorMsg && <p className="error">{errorMsg}</p>}
          <div>
            <label forhtml="name">First name</label>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {firstNameError && <p className="error">{firstNameError}</p>}
          <div>
            <label forhtml="name">Last name</label>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {lastNameError && <p className="error">{lastNameError}</p>}
          <div>
            <label forhtml="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {emailError && <p className="error">{emailError}</p>}
          <div>
            <label forhtml="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {passwordError && <p className="error">{passwordError}</p>}
          <div className="submit-btn">
            <input type="submit" value="Sign in" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
