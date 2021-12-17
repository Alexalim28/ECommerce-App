import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
