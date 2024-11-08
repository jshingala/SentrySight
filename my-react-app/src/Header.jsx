import React from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './header.css'; // Import the CSS file

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>Sentry Sight</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/demo">Demo</Link></li> {/* Update this line */}
          <li className="nav-item"><Link className="nav-link" to="/questionnaire">Questionnaire</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/sign-up">Sign Up / Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
