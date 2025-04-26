import React from 'react';
import "./ContactUs.css"

function ContactUs() {

  return (
<div className="contact-main-content">
  <div className="contact-header">
    <h1>Get in Touch</h1>
    <p>
      Ready to enhance your security with AI-powered solutions? Our team of
      experts is here to help you create a safer environment for your organization.
    </p>
  </div>

  <div className="contact-cards">

    {/* Call Us Card */}
    <div className="contact-card">
      <div className="contact-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.8 }}>
          <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
        </svg>
      </div>
      <h2>Call Us</h2>
      <p>Available 24/7 for urgent inquiries</p>
      <a href="tel:1-916-425-6820">(916) 425-6820</a>
    </div>

    {/* Email Us Card */}
    <div className="contact-card">
      <div className="contact-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.8 }}>
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </div>
      <h2>Email Us</h2>
      <p>Get detailed information</p>
      <a href="mailto:modernritchie@yahoo.com">contact@sentrysight.com</a>
    </div>

    {/* Business Hours Card */}
    <div className="contact-card">
      <div className="contact-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.8 }}>
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      </div>
      <h2>Business Hours</h2>
      <p>Mon - Fri: 9AM - 6PM</p>
      <span>24/7 Emergency Support</span>
    </div>

  </div>

  <div className="contact-footer">
    <p>Experience the future of security with SentrySight's AI-powered solutions</p>
  </div>
</div>
  );
}

export default ContactUs;