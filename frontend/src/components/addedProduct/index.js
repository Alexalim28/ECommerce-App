import "./addedProduct.css";
import React from "react";
import { BsTrash } from "react-icons/bs";

const AddedProduct = ({ details }) => {
  const { name, imgUrl, price } = details;

  const deleteProduct = async () => {};

  return (
    <div className="added-container">
      <img src={imgUrl} alt="added-product" />
      <div className="details">
        <h3>{name}</h3>
        <p>{price} $</p>
      </div>
      <div className="trash" onClick={deleteProduct}>
        <BsTrash />
      </div>
    </div>
  );
};

export default AddedProduct;
