import "./login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setShowLoginModal, setIsLogged, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const logInHandler = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    try {
      await axios.post(
        "http://localhost:8080/api/accounts/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setIsLogged(true);
      setIsLoggedIn(true);
      setShowLoginModal(false);
    } catch (error) {
      setErrorMsg(error.response.data.errors);
    }
  };

  return (
    <>
      <div className="overlay">
        <form className="modal" onSubmit={logInHandler}>
          <h3 className="modal-title">Log in</h3>
          <div onClick={() => setShowLoginModal(false)}>
            <div className="close-modal">
              <span>X</span>
            </div>
          </div>
          <div>
            <label forhtml="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label forhtml="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMsg && <p className="error">{errorMsg}</p>}
          <div>
            <Link to="/forgot">
              Forgot your password?
              <span> Click here to reset your password</span>
            </Link>
          </div>
          <div className="submit-btn">
            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
