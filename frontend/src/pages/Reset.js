import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/accounts/reset/${id}`,
        {
          password,
          passwordConfirm,
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
      <div>
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm your password</label>
            <input
              type="text"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default Reset;
