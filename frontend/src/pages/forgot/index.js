import "./forgot.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Forgot = ({ setShowLoginModal }) => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setShowLoginModal(false);
  }, [setShowLoginModal]);

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/accounts/forgot",
        {
          email,
        },
        { withCredentials: true }
      );
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style: { background: "lightgreen", color: "#FFF" },
      });
    } catch (error) {
      setErrorMsg(error.response.data.errors);
    }
  };
  return (
    <div className="container">
      <h2>Enter your email to reset your password</h2>
      <form className="form" onSubmit={sendEmail}>
        <div className="input">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <input className="btn" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Forgot;
