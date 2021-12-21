import "./forgot.css";
import React from "react";
import { useState } from "react";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");

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
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container">
      <h2>Enter your email to reset your password</h2>
      <form className="form" onSubmit={sendEmail}>
        <div className="input">
          <label htmlfor="email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input className="btn" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Forgot;
