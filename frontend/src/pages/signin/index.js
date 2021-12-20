import "./signin.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signin = ({ setShowSigninModal }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:8080/api/accounts/signin",
      {
        firstName,
        lastName,
        email,
        password,
      }
    );
    console.log(data.message);
  };

  return (
    <>
      <div className="overlay-signin">
        <form className="modal" id="form">
          <h3 className="modal-title">Sign in</h3>
          <p onClick={() => setShowSigninModal(false)}>
            <div className="close-modal">
              <span>X</span>
            </div>
          </p>
          <div>
            <label for="name">First name</label>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label for="name">Last name</label>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="error name-err"></div>
          <div>
            <label for="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="error email-err"></div>
          <div>
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="error password-err"></div>
          <div>
            <Link to="/login">
              Already got an account?<span> Log in here...</span>
            </Link>
          </div>
          <div className="submit-btn" onSubmit={signInHandler}>
            <input type="submit" value="Sign in" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
