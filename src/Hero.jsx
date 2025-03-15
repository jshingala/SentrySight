import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import './global.css';

const Hero = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start('visible');
  }, [controls]);
  
  const heroVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const styles = {
    hero: {
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
    },
    securityOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    },
    detectionBox: {
      position: 'absolute',
      top: '20%',
      left: '30%',
      width: '200px',
      height: '200px',
      border: '2px solid #8a89e6',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    detectionMarker: {
      width: '150px',
      height: '150px',
      border: '2px solid #d084f3',
      borderRadius: '50%',
    },
    detectionLabel: {
      position: 'absolute',
      bottom: '-30px',
      background: 'rgba(26, 26, 26, 0.8)',
      color: '#d084f3',
      padding: '5px 10px',
      borderRadius: '5px',
      fontSize: '0.9rem',
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '900px',
      textAlign: 'center',
      padding: '0 20px',
    },
    heroTitle: {
      fontSize: '3.5rem',
      marginBottom: '20px',
      backgroundImage: 'linear-gradient(to right, #8a89e6, #d084f3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
      fontSize: '1.4rem',
      color: '#bfbfbf',
      marginBottom: '40px',
      maxWidth: '700px',
      margin: '0 auto 40px auto',
    },
    ctaButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '60px',
    },
    btnSecondary: {
      backgroundColor: 'transparent',
      border: '2px solid #8a89e6',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
    },
    securityFeatures: {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      flexWrap: 'wrap',
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      backgroundColor: 'rgba(51, 51, 51, 0.7)',
      padding: '15px 20px',
      borderRadius: '10px',
    },
    featureIcon: {
      fontSize: '2rem',
    },
    featureText: {
      textAlign: 'left',
    },
    featureTitle: {
      fontSize: '1.1rem',
      marginBottom: '5px',
      color: '#FFFFFF',
    },
    featureDescription: {
      fontSize: '0.9rem',
      color: '#bfbfbf',
    },
  };

  return (
    <div style={styles.hero}>
      {/* Security detection overlay */}
      <div style={styles.securityOverlay}>
        <div style={styles.detectionBox}>
          <motion.div
            style={styles.detectionMarker}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "linear"
            }}
          />
          <motion.div
            style={styles.detectionLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Movement Detected 0.81
          </motion.div>
        </div>
      </div>
      
      {/* Main content */}
      <motion.div
        style={styles.heroContent}
        initial="hidden"
        animate={controls}
        variants={heroVariants}
      >
        <motion.h1
          variants={itemVariants}
          style={styles.heroTitle}
        >
          Experience Peace of Mind
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          style={styles.heroSubtitle}
        >
          Cutting-edge technology to keep your home and business safe.
        </motion.p>
        
        <motion.div
          style={styles.ctaButtons}
          variants={itemVariants}
        >
          <motion.a
            href="/sign-in"
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.a>
          
          <motion.a
            href="/demo"
            className="btn"
            style={styles.btnSecondary}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.a>
        </motion.div>
        
        {/* Additional security features */}
        <motion.div
          style={styles.securityFeatures}
          variants={itemVariants}
        >
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📹</div>
            <div style={styles.featureText}>
              <h3 style={styles.featureTitle}>Real-time Monitoring</h3>
              <p style={styles.featureDescription}>24/7 video surveillance</p>
            </div>
          </div>
          
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🔍</div>
            <div style={styles.featureText}>
              <h3 style={styles.featureTitle}>AI Detection</h3>
              <p style={styles.featureDescription}>Smart object recognition</p>
            </div>
          </div>
          
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📱</div>
            <div style={styles.featureText}>
              <h3 style={styles.featureTitle}>Mobile Alerts</h3>
              <p style={styles.featureDescription}>Instant notifications</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;