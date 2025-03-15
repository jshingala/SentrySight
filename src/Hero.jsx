import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import './Hero.css';

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

  return (
    <div className="hero">
      {/* Security detection overlay */}
      <div className="security-overlay">
        <div className="detection-box">
          <motion.div
            className="detection-marker"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "linear"
            }}
          />
          <motion.div
            className="detection-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Movement Detected 0.81
          </motion.div>
        </div>
      </div>
      
      {/* Hero Content */}
      <motion.div
        className="hero-content"
        initial="hidden"
        animate={controls}
        variants={heroVariants}
      >
        <motion.h1
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          style={{ fontSize: '3.5rem' }}
          className="hero-title"
        >
          Experience Peace of Mind
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          style={{ fontSize: '1.4rem' }}
          className="hero-subtitle"
        >
          Cutting-edge technology to keep your home and business safe.
        </motion.p>
        
        <motion.div
          className="cta-buttons"
          variants={itemVariants}
        >
          <motion.a
            href="/sign-in"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.a>
          
          <motion.a
            href="/demo"
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.a>
        </motion.div>
        
        {/* Additional security features */}
        <motion.div
          className="security-features"
          variants={itemVariants}
        >
          <div className="feature">
            <div className="feature-icon">📹</div>
            <div className="feature-text">
              <h3>Real-time Monitoring</h3>
              <p>24/7 video surveillance</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">🔍</div>
            <div className="feature-text">
              <h3>AI Detection</h3>
              <p>Smart object recognition</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">📱</div>
            <div className="feature-text">
              <h3>Mobile Alerts</h3>
              <p>Instant notifications</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;