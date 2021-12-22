import "./cart.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getCart = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/carts/getCart",
          { withCredentials: true }
        );
        console.log(data.cart.products);
      } catch (error) {
        setErrorMsg(error.response.data.errors);
      }
    };
    getCart();
  }, []);

  return (
    <div className="cart-container">
      {errorMsg ? (
        <h2 className="errorMessage">{errorMsg}</h2>
      ) : (
        <h2>This is the cart page</h2>
      )}
    </div>
  );
};

export default Cart;
