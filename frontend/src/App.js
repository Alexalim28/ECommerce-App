import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import Signin from "./components/signin";
import Forgot from "./pages/forgot/Forgot";
import Reset from "./pages/reset/Reset";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="App">
      <Navbar
        setShowSigninModal={setShowSigninModal}
        setShowLoginModal={setShowLoginModal}
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
