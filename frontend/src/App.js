import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import Forgot from "./pages/forgot/Forgot";
import Reset from "./pages/reset/Reset";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
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
