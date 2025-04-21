import React from "react";
import './homepage.css'; // Import CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Socials() {
  return (
    <section className="socials">
      <h2 className="socials-title">Follow Us</h2>
      <div className="socials-links">
        <a className="social-link" href="https://facebook.com" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a className="social-link" href="https://twitter.com" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a className="social-link" href="https://instagram.com" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a className="social-link" href="https://linkedin.com" aria-label="LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </section>
  );
}

export default Socials;
