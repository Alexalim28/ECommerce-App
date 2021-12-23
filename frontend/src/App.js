import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Signin from "./components/signin";
import Login from "./components/login";

function App() {
  const [cart, setCart] = useState([]);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getLoginCookie = () => {
      const loginCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("name="));
      if (loginCookie) {
        setIsLoggedIn(true);
      }
    };
    if (location.state === "reload") {
      setIsReloaded(true);
    }
    getLoginCookie();
  }, [location]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/carts/getCart",
          { withCredentials: true }
        );
        setCart(data.cart.products);
      } catch (error) {
        setCart([]);
      }
    };
    fetchCart();
  }, []);

  const displaySignin = showSigninModal && (
    <Signin
      setShowSigninModal={setShowSigninModal}
      setIsCreated={setIsCreated}
    />
  );

  const displayLogin = showLoginModal && (
    <Login
      setShowLoginModal={setShowLoginModal}
      setShowSigninModal={setShowSigninModal}
      setIsLoggedIn={setIsLoggedIn}
    />
  );

  return (
    <div className="App">
      <ToastContainer />
      <Navbar
        setShowSigninModal={setShowSigninModal}
        setShowLoginModal={setShowLoginModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setCart={setCart}
        productQty={cart.length}
      />
      {displaySignin}
      {displayLogin}
      <Routes>
        <Route path="/" exact element={<Home isCreated={isCreated} />} />
        <Route
          path="/product/:id"
          element={
            <Product setShowLoginModal={setShowLoginModal} setCart={setCart} />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route
          path="/forgot"
          element={<Forgot setShowLoginModal={setShowLoginModal} />}
        />
        <Route path="/reset/:id" element={<Reset />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
