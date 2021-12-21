import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getLoginCookie = () => {
      const loginCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("name="));
      if (loginCookie) {
        setIsLoggedIn(true);
      }
    };
    getLoginCookie();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar
        setShowSigninModal={setShowSigninModal}
        setShowLoginModal={setShowLoginModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              showSigninModal={showSigninModal}
              setShowSigninModal={setShowSigninModal}
              showLoginModal={showLoginModal}
              setShowLoginModal={setShowLoginModal}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:id" element={<Reset />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
