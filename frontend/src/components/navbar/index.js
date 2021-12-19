import "./navbar.css";
import { Link } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";

const Navbar = () => {
  return (
    <div>
      <ul className="navbar">
        <li className="logo">E-Commerce App</li>
        <li className="greeting">Welcome Salim !</li>
        <li className="cart">
          <Link to="/cart">
            <CgShoppingCart />
          </Link>
          <div className="items">
            <span>0</span>
          </div>
        </li>
        <li className="signin">
          <Link to="/signin">Sign In</Link>
        </li>
        <li className="login">
          <Link to="/signin">Log In</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
