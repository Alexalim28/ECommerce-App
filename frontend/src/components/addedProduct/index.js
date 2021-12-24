import "./addedProduct.css";
import React from "react";
import { BsTrash } from "react-icons/bs";

const AddedProduct = ({ details, deleteProduct }) => {
  const { name, imgUrl, price, _id } = details;

  return (
    <div className="added-container">
      <img src={imgUrl} alt="added-product" />
      <div className="details">
        <h3>{name}</h3>
        <p className="price">{price} $</p>
      </div>
      <div className="trash" onClick={() => deleteProduct(_id)}>
        <BsTrash />
      </div>
    </div>
  );
};

export default AddedProduct;
