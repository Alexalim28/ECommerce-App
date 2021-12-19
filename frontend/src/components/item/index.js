import React from "react";
import { Link } from "react-router-dom";
import "./item.css";
import { VscCheck } from "react-icons/vsc";
import { ImCross } from "react-icons/im";

const Item = ({ id, name, imgUrl, description, price, qtyInStock }) => {
  return (
    <div className="item">
      <img className="img" src={imgUrl} alt="product" />
      <div className="info">
        <p className="product-name">{name}</p>
        <p className="product-price">{price} $</p>
      </div>
      <div className="item-footer">
        <Link to={`product/${id}`}>
          <p className="product-detail">See more details...</p>
        </Link>
        <p className={`icon ${qtyInStock !== 0 ? "ok" : "not-available"}`}>
          {qtyInStock !== 0 ? <VscCheck /> : <ImCross />}
        </p>
        <p className="product-dispo">available</p>
      </div>
    </div>
  );
};

export default Item;
