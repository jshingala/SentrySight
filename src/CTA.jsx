import { motion } from "framer-motion";
import React from "react";
import "./global.css";

const buttonVariant = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

const CTA = () => {
  const styles = {
    ctaSection: {
      padding: '60px 0',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
    },
    ctaTitle: {
      fontSize: '2.8rem',
      marginBottom: '20px',
      backgroundImage: 'linear-gradient(to right, #8a89e6, #d084f3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    ctaSubtext: {
      fontSize: '1.2rem',
      color: '#bfbfbf',
      marginBottom: '40px',
      maxWidth: '600px',
      margin: '0 auto 40px auto',
    },
    ctaButtonsContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    ctaButtons: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    secondaryBtn: {
      backgroundColor: 'transparent',
      border: '2px solid #8a89e6',
      color: 'white',
    }
  };

  return (
    <section className="card" style={styles.ctaSection}>
      <div className="container">
        <motion.h2 
          style={styles.ctaTitle} 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p 
          style={styles.ctaSubtext} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.2 }}
        >
          Take the first step towards smarter security solutions.
        </motion.p>
        <motion.div 
          style={styles.ctaButtonsContainer}
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div style={styles.ctaButtons}>
            <motion.button 
              variants={buttonVariant} 
              whileHover="hover" 
              className="btn"
            >
              Sign Up
            </motion.button>
            <motion.button 
              variants={buttonVariant} 
              whileHover="hover" 
              className="btn"
              style={styles.secondaryBtn}
            >
              See Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;