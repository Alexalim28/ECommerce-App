import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./product.css";

const Product = ({ setShowLoginModal, setCart }) => {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [qtyInStock, setQtyInStock] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/products/getProduct/${id}`
      );

      const { name, imgUrl, description, price, qtyInStock } = data.product;

      setName(name);
      setImgUrl(imgUrl);
      setDescription(description);
      setPrice(price);
      setQtyInStock(qtyInStock);
    };

    fetchProduct();
  }, [id]);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `http://localhost:8080/api/carts/addProduct/${id}`,
        {
          name,
          imgUrl,
          description,
          price,
          qtyInStock,
        },
        { withCredentials: true }
      );
      setCart(data.cart.products);
      window.location.reload();
    } catch (error) {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="product-container">
      <img className="img" src={imgUrl} alt="product" />
      <div className="detail">
        <p className="name">{name}</p>
        <p className="description">{description}</p>
      </div>
      <div className="card">
        <div className="quantity">
          <span className="subtitle">Quantity:</span>
          <span>{qtyInStock}</span>
        </div>
        <div className="price">
          <span className="subtitle">Price:</span>
          <span>{price} $</span>
        </div>
        <button className="add-btn" onClick={addProduct}>
          add to my cart
        </button>
      </div>
    </div>
  );
};

export default Product;
