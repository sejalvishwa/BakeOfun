import "./Navigation.css";
import logo from "../assets/images/BakeOfun-logo.png";
import { HiOutlineChevronDown, HiOutlineMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false); // optional: close dropdown on toggle
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#">
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <HiX /> : <HiOutlineMenu />}
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li
            className={`dropdown ${dropdownOpen ? "active" : ""}`}
            onClick={toggleDropdown}
          >
            PRODUCTS <HiOutlineChevronDown className="arrow-icon" />
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/bread"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Bread & Buns
                </Link>
              </li>

              <li>Rusk/Toast</li>
              <li>Cakes & Muffins</li>
              <li>Cookies</li>
              <li>Other</li>
              <li>Live Products</li>
              <li>Gifts & Gourmet</li>
            </ul>
          </li>
          <li>
            <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{ color: "white", textDecoration: "none" }}
            >
              ABOUT US
            </Link>
          </li>
          <li>
            <Link
              to="/liveproducts"
              style={{ color: "white", textDecoration: "none" }}
            >
              LIVE PRODUCTS
            </Link>
          </li>
          <li>
            <Link
              to="/latestnews"
              style={{ color: "white", textDecoration: "none" }}
            >
              LATEST NEWS
            </Link>
          </li>
          <li>
            <Link
              to="/enquries"
              style={{ color: "white", textDecoration: "none" }}
            >
              CONTACT / ENQUIRIES
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
