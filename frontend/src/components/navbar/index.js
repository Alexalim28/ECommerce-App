import "./navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgShoppingCart } from "react-icons/cg";
import { GrHomeRounded } from "react-icons/gr";

const Navbar = ({
  setShowSigninModal,
  setShowLoginModal,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const logOut = async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/accounts/logout",
      { withCredentials: true }
    );
    if (data.message) {
      setIsLoggedIn(false);
    }
  };

  const getNameCookie = () => {
    if (document.cookie) {
      return document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("name="))
        .split("=")[1];
    } else {
      return "";
    }
  };

  return (
    <div>
      <ul className="navbar">
        <li className="logo">
          <Link to="/">E-Commerce App</Link>
        </li>
        <li className="home">
          <Link to="/">
            <GrHomeRounded />
          </Link>
        </li>

        <li className="greeting">Welcome {getNameCookie()} !</li>
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
        {!isLoggedIn ? (
          <li className="login" onClick={() => setShowLoginModal(true)}>
            <p>Log In</p>
          </li>
        ) : (
          <li className="login" onClick={logOut}>
            <p>Log Out</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
