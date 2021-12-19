import { useState, useEffect } from "react";

// Third Party Library
import axios from "axios";

// Components
import Item from "../../components/item";

import "./home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/products/getAllProducts"
      );
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <section className="grid">
        {products.map((product) => {
          const {
            _id: id,
            name,
            imgUrl,
            description,
            price,
            qtyInStock,
          } = product;
          return (
            <Item
              key={id}
              id={id}
              name={name}
              imgUrl={imgUrl}
              description={description}
              price={price}
              qtyInStock={qtyInStock}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Home;
