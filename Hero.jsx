import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <h1>Welcome to Sentry Sight</h1>
      <p>Your security is our priority.</p>
      <Link to="/demo">
        <button>Get Started</button>  {/* Wrap the button inside a Link component */}
      </Link>
    </section>
  );
}

export default Hero;
