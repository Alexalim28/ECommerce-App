import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";
import Item from "../../components/item";

const override = css`
  display: block;
  min-height: calc(100vh - 80px);
  margin: auto;
`;

const Home = ({ isCreated }) => {
  const [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/products/getAllProducts"
      );
      setProducts(data.products);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isCreated) {
      toast.success("Please check your emails", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style: { background: "lightgreen", color: "#FFF" },
      });
    }
  }, [isCreated]);

  return (
    <div className="home-container">
      <HashLoader color="#7B2CC2" loading={loading} css={override} size={100} />
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
