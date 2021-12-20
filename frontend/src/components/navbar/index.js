import "./navbar.css";
import { Link } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";

const Navbar = ({ setShowSigninModal, setShowLoginModal }) => {
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
        <li className="signin" onClick={() => setShowSigninModal(true)}>
          <p>Sign In</p>
        </li>
        <li className="login" onClick={() => setShowLoginModal(true)}>
          <p>Log In</p>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
