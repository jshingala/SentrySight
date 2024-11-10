// Footer.jsx
import React from 'react';
import './footer.css'; // Import the CSS file for the footer

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} SentrySight. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
