import "./cart.css";
import React from "react";
import AddedProduct from "../../components/addedProduct";

const Cart = ({ cart, total, deleteProduct }) => {
  return (
    <>
      <h1 className="title">Your cart</h1>
      <div className="cart-container">
        <div className="list">
          {cart.length === 0 ? (
            <h2 className="errorMessage">
              You must be logged in or create an account
            </h2>
          ) : (
            cart.map((product) => (
              <AddedProduct
                key={product._id}
                details={product}
                deleteProduct={deleteProduct}
              />
            ))
          )}
        </div>
        <div className="total">
          <div className="quantity">
            <span className="subtitle">Quantity:</span>
            <span>{cart.length}</span>
          </div>
          <div className="price">
            <span className="subtitle">Total:</span>
            <span>{total} $</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
