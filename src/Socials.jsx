import React from "react";
import './homepage.css'; // Import CSS
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Socials = () => {
  return (
    <div className="socials-page">
      <h1 className="socials-title">Stay Updated</h1>
      <div className="socials-icons">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FaFacebookF className="icon" />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <FaTwitter className="icon" />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <FaInstagram className="icon" />
  </a>
</div>
      <p className="socials-text">
        Follow us on our official social platforms for the latest updates.
      </p>
    </div>
  );
};

export default Socials;