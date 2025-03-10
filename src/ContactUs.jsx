import React from 'react';

function ContactUs() {
  const mainContainerStyle = {
    minHeight: "100vh",
    backgroundColor: "#1A1A1A",
    color: "white",
    padding: "60px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "50px"
  };

  const headerTitleStyle = {
    fontSize: "2.5rem",
    fontWeight: "normal",
    marginBottom: "20px",
    fontFamily: "monospace"
  };

  const headerDescriptionStyle = {
    fontSize: "1.1rem",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.6",
    color: "#e0e0e0"
  };

  const cardsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "1200px",
    marginBottom: "60px"
  };

  const cardStyle = {
    backgroundColor: "#2a2a2a",
    borderRadius: "8px",
    padding: "30px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const iconContainerStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "rgba(138, 43, 226, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px"
  };

  const cardTitleStyle = {
    fontSize: "1.8rem",
    fontWeight: "normal",
    marginBottom: "15px",
    fontFamily: "monospace"
  };

  const cardDescriptionStyle = {
    color: "#e0e0e0",
    marginBottom: "15px"
  };

  const linkStyle = {
    color: "#9c5bec",
    textDecoration: "none"
  };

  const purpleLinkStyle = {
    color: "#9c5bec",
    textDecoration: "none"
  };

  const footerStyle = {
    textAlign: "center",
    maxWidth: "800px"
  };

  const footerTextStyle = {
    marginBottom: "30px",
    color: "#e0e0e0"
  };

  const buttonStyle = {
    backgroundColor: "#9c5bec",
    color: "white",
    border: "none",
    padding: "15px 30px",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer"
  };

  return (
    <div style={mainContainerStyle}>
      <div style={headerStyle}>
        <h1 style={headerTitleStyle}>Get in Touch</h1>
        <p style={headerDescriptionStyle}>
          Ready to enhance your security with AI-powered solutions? Our team of
          experts is here to help you create a safer environment for your organization.
        </p>
      </div>

      <div style={cardsContainerStyle}>
        {/* Call Us Card */}
        <div style={cardStyle}>
          <div style={iconContainerStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{opacity: 0.8}}>
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM15 4h2.5c.3 0 .5.2.5.5v2c0 .3-.2.5-.5.5H15c-.3 0-.5-.2-.5-.5v-2c0-.3.2-.5.5-.5zm-5 0h2.5c.3 0 .5.2.5.5v2c0 .3-.2.5-.5.5H10c-.3 0-.5-.2-.5-.5v-2c0-.3.2-.5.5-.5zm-5 0h2.5c.3 0 .5.2.5.5v2c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5v-2c0-.3.2-.5.5-.5z" />
            </svg>
          </div>
          <h2 style={cardTitleStyle}>Call Us</h2>
          <p style={cardDescriptionStyle}>Available 24/7 for urgent inquiries</p>
          <a href="tel:1-916-425-6820" style={purpleLinkStyle}>(916) 425-6820</a>
        </div>

        {/* Email Us Card */}
        <div style={cardStyle}>
          <div style={iconContainerStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{opacity: 0.8}}>
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <h2 style={cardTitleStyle}>Email Us</h2>
          <p style={cardDescriptionStyle}>Get detailed information</p>
          <a href="mailto:modernritchie@yahoo.com" style={purpleLinkStyle}>contact@sentrysight.com</a>
        </div>

        {/* Visit Us Card */}

        {/* Business Hours Card */}
        <div style={cardStyle}>
          <div style={iconContainerStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{opacity: 0.8}}>
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>
          <h2 style={cardTitleStyle}>Business Hours</h2>
          <p style={cardDescriptionStyle}>Mon - Fri: 9AM - 6PM</p>
          <span style={purpleLinkStyle}>24/7 Emergency Support</span>
        </div>
      </div>

      <div style={footerStyle}>
        <p style={footerTextStyle}>Experience the future of security with SentrySight's AI-powered solutions</p>
      </div>
    </div>
  );
}

export default ContactUs;