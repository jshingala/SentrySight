import React from 'react';
import './CTA.css';

function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <h2>Ready to Get Started?</h2>
        <p>Take the first step towards smarter security solutions. Join us today!</p>
        <div className="cta-buttons">
          <a href="/sign-up" className="btn-primary">Sign Up</a>
          <a href="/demo" className="btn-secondary">See Demo</a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
