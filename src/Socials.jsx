import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";

function Socials() {
  return (
    <section className="container">
      <div className="text-center" style={{ padding: "40px 0" }}>
        <h2 style={{ marginBottom: "20px" }}>Follow Us</h2>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "20px"
        }}>
          <a 
            href="https://facebook.com" 
            aria-label="Facebook"
            style={{ 
              fontSize: "24px", 
              color: "white",
              transition: "transform 0.3s ease"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.2)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a 
            href="https://twitter.com" 
            aria-label="Twitter"
            style={{ 
              fontSize: "24px", 
              color: "white",
              transition: "transform 0.3s ease"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.2)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a 
            href="https://instagram.com" 
            aria-label="Instagram"
            style={{ 
              fontSize: "24px", 
              color: "white",
              transition: "transform 0.3s ease"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.2)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a 
            href="https://linkedin.com" 
            aria-label="LinkedIn"
            style={{ 
              fontSize: "24px", 
              color: "white",
              transition: "transform 0.3s ease"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.2)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Socials;