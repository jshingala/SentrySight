import React from "react";
import './socials.css'; // Import the CSS file

function Socials() {
  return (
    <section className="socials">
      <h2 className="socials-title">Follow Us</h2>
      <div className="socials-links">
        <a className="social-link" href="#facebook">Facebook</a>
        <a className="social-link" href="#twitter">Twitter</a>
        <a className="social-link" href="#instagram">Instagram</a>
        <a className="social-link" href="#linkedin">LinkedIn</a>
      </div>
    </section>
  );
}

export default Socials;
