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
    <div>
      <h4>Forgot Password</h4>
      <form onSubmit={sendEmail}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Forgot;
