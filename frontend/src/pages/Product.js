import React, { useState } from "react";

import axios from "axios";

const Product = () => {
  const [name, setName] = useState("Playstation");
  const [imgUrl, setImgUrl] = useState("http://www.images.com/playstation.png");
  const [description, setDescription] = useState("A cool playstation 5");
  const [price, setPrice] = useState(599);
  const [qtyInStock, setQtyInStock] = useState(10);

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
    <div>
      <button onClick={addProduct}>Add product</button>
    </div>
  );
};

export default Product;
