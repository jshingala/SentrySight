import React from "react";
import './header.css'; // Import the CSS file

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>Sentry Sight</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
          <li className="nav-item"><a className="nav-link" href="#demo">Demo</a></li>
          <li className="nav-item"><a className="nav-link" href="#questionnaire">Questionnaire</a></li>
          <li className="nav-item"><a className="nav-link" href="#sign-up">Sign Up / Register</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
