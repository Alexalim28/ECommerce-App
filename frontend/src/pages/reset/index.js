import "./reset.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const resetPassword = async (e) => {
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
      navigate("/", { state: "reload" });
    } catch (error) {
      setErrorMsg(error.response.data.errors);
    }
  };

  return (
    <div className="reset-container">
      <h2>Enter your email to reset your password</h2>
      <form className="form" onSubmit={resetPassword}>
        <div className="input">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm your password</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <input className="btn" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Reset;
