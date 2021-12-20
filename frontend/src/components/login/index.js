import "./login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setShowLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:8080/api/accounts/login",
      {
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
          <h3 className="modal-title">Log in</h3>
          <p onClick={() => setShowLoginModal(false)}>
            <div className="close-modal">
              <span>X</span>
            </div>
          </p>
          <div>
            <label for="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Link to="/forgot">
              Forgot your password?
              <span> Click here to reset your password</span>
            </Link>
          </div>
          <div className="submit-btn" onSubmit={logInHandler}>
            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
