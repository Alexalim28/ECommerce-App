import "./home.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Third Party Library
import axios from "axios";

// Components
import Item from "../../components/item";
import Signin from "../../components/signin";
import Login from "../../components/login";

const Home = ({
  showSigninModal,
  setShowSigninModal,
  showLoginModal,
  setShowLoginModal,
  setIsLoggedIn,
}) => {
  const [products, setProducts] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/products/getAllProducts"
      );
      setProducts(data.products);
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
    if (isLogged) {
      toast.success("Your are succesfully logged in", {
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
  }, [isCreated, isLogged]);

  return (
    <div className="home-container">
      {showSigninModal && (
        <Signin
          setShowSigninModal={setShowSigninModal}
          setIsCreated={setIsCreated}
        />
      )}
      {showLoginModal && (
        <Login
          setShowLoginModal={setShowLoginModal}
          setIsLogged={setIsLogged}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
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
