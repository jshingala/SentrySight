import React from "react";
import { Link } from "react-router-dom";
import AIChatbot from "./Chatbot";
import "./global.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} SentrySight. All rights reserved.</p>
        </div>
        <div className="important-links">
          <h4>Important Links</h4>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-socials">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
        <div className="footer-chatbot">
          <AIChatbot />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
