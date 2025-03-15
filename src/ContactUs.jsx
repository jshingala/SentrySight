import { motion } from 'framer-motion';
import React from 'react';
import './global.css';

function ContactUs() {
  const styles = {
    mainContainer: {
      minHeight: "100vh",
      padding: "60px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    header: {
      textAlign: "center",
      marginBottom: "50px"
    },
    headerTitle: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      backgroundImage: 'linear-gradient(to right, #8a89e6, #d084f3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    headerDescription: {
      fontSize: "1.1rem",
      maxWidth: "800px",
      margin: "0 auto",
      lineHeight: "1.6",
      color: "#bfbfbf"
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      width: "100%",
      maxWidth: "1200px",
      marginBottom: "60px"
    },
    iconContainer: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "rgba(138, 137, 230, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20px"
    },
    cardTitle: {
      fontSize: "1.8rem",
      marginBottom: "15px",
      color: "#d084f3",
    },
    cardDescription: {
      color: "#bfbfbf",
      marginBottom: "15px"
    },
    purpleLink: {
      color: "#8a89e6",
      textDecoration: "none",
      transition: "color 0.3s ease"
    },
    footer: {
      textAlign: "center",
      maxWidth: "800px"
    },
    footerText: {
      marginBottom: "30px",
      color: "#bfbfbf"
    }
  };

  return (
    <div style={styles.mainContainer}>
      <motion.div 
        style={styles.header}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 style={styles.headerTitle}>Get in Touch</h1>
        <p style={styles.headerDescription}>
          Ready to enhance your security with AI-powered solutions? Our team of
          experts is here to help you create a safer environment for your organization.
        </p>
      </motion.div>

      <motion.div 
        style={styles.cardsContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Call Us Card */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ 
            transform: 'translateY(-10px)',
            boxShadow: '0 12px 25px rgba(0, 0, 0, 0.35)'
          }}
        >
          <div style={styles.iconContainer}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{opacity: 0.8}}>
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM15 4h2.5c.3 0 .5.2.5.5v2c0 .3-.2.5-.5.5H15c-.3 0-.5-.2-.5-.5v-2c0-.3.2-.5.5-.5zm-5 0h2.5c.3 0 .5.2.5.5v2c0 .3-.2.5-.5.5H10c-.3 0-.5-.2-.5-.5v-2c0-.3.2-.5.5-.5zm-5 0h2.5c.3 0 .5.2.5.5v2c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5v-2c0-.3.2-.5.5-.5z" />
            </svg>
          </div>
          <h2 style={styles.cardTitle}>Call Us</h2>
          <p style={styles.cardDescription}>Available 24/7 for urgent inquiries</p>
          <motion.a 
            href="tel:1-916-425-6820" 
            style={styles.purpleLink}
            whileHover={{ color: "#d084f3" }}
          >
            (916) 425-6820
          </motion.a>
        </motion.div>

        {/* Email Us Card */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ 
            transform: 'translateY(-10px)',
            boxShadow: '0 12px 25px rgba(0, 0, 0, 0.35)'
          }}
        >
          <div style={styles.iconContainer}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{opacity: 0.8}}>
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <h2 style={styles.cardTitle}>Email Us</h2>
          <p style={styles.cardDescription}>Get detailed information</p>
          <motion.a 
            href="mailto:contact@sentrysight.com" 
            style={styles.purpleLink}
            whileHover={{ color: "#d084f3" }}
          >
            contact@sentrysight.com
          </motion.a>
        </motion.div>

        {/* Business Hours Card */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ 
            transform: 'translateY(-10px)',
            boxShadow: '0 12px 25px rgba(0, 0, 0, 0.35)'
          }}
        >
          <div style={styles.iconContainer}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{opacity: 0.8}}>
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>
          <h2 style={styles.cardTitle}>Business Hours</h2>
          <p style={styles.cardDescription}>Mon - Fri: 9AM - 6PM</p>
          <motion.span 
            style={styles.purpleLink}
            whileHover={{ color: "#d084f3" }}
          >
            24/7 Emergency Support
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div 
        style={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p style={styles.footerText}>Experience the future of security with SentrySight's AI-powered solutions</p>
        <motion.button 
          className="btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request a Demo
        </motion.button>
      </motion.div>
    </div>
  );
}

export default ContactUs;