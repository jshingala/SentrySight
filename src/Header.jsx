import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for transitions
import "./header.css";

function Header({ userEmail }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <h1>SENTRY SIGHT</h1>
        </Link>
      </div>
      <nav className="nav-desktop">
        <ul className="nav-list">
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/demo">
              Demo
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/questionnaire">
              Questionnaire
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/faq">
              FAQ
            </Link>
          </li>
          {/* Conditionally render Register/Sign In or Profile */}
          <li className="nav-item">
            <Link className="nav-link" to={userEmail ? "/profile" : "/sign-in"}>
              {userEmail ? "Profile" : "Register / Sign In"}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5 }}
          >
            <div className="back-arrow" onClick={toggleMenu}>
              &#8592; {/* Left arrow symbol */}
            </div>
            <ul className="nav-list">
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={toggleMenu}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/demo" onClick={toggleMenu}>
                  Demo
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/questionnaire"
                  onClick={toggleMenu}
                >
                  Questionnaire
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faq" onClick={toggleMenu}>
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sign-in" onClick={toggleMenu}>
                  Register / Sign In
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;

