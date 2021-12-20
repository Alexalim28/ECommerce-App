import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./product.css";

const Product = () => {
  const [name, setName] = useState("Playstation");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("A cool playstation 5");
  const [price, setPrice] = useState(599);
  const [qtyInStock, setQtyInStock] = useState(10);

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
        "http://localhost:8080/api/carts/addProduct",
        {
          name,
          imgUrl,
          description,
          price,
          qtyInStock,
        },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
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
