import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  useEffect(() => {
    const getCart = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/carts/getCart",
          { withCredentials: true }
        );
        console.log(data.cart.products);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCart();
  }, []);

  return (
    <div>
      <h2>This is the cart page</h2>
    </div>
  );
};

export default Cart;
