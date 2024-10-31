
import React from "react";
import './CSS.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>Sentry Sight</h1>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about us">About Us</a></li>
          <li><a href="#demo">Demo</a></li>
          <li><a href="#questionaire">Questionaire</a></li>
          <li><a href="#sign up">Sign Up / Register</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;