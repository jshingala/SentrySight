import React from "react";
import { Link } from "react-router-dom";
import './header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <h1>Sentry Sight</h1>
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/demo">Demo</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/questionnaire">Questionnaire</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/sign-in">Register / Sign In</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
