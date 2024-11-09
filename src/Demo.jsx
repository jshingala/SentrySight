// Demo.jsx
import React from 'react';
import './demo.css';  // Ensure to import CSS for styling
import { motion } from 'framer-motion';

function Demo() {
  return (
    <motion.div
      className="demo-page"
      initial={{ opacity: 0 }} // Start with opacity 0
      animate={{ opacity: 1 }} // Animate to opacity 1
      transition={{ duration: 1 }} // Set the duration for the transition
    >
      <motion.h1
        initial={{ x: -200 }} // Start position (off-screen left)
        animate={{ x: 0 }} // Animate to original position
        transition={{ duration: 1 }}
      >
        Demo Page
      </motion.h1>
      
      <motion.p
        initial={{ y: 50 }} // Start position (below)
        animate={{ y: 0 }} // Animate to original position
        transition={{ duration: 1 }}
      >
        Welcome to the SentrySight Demo. Here, you'll experience firsthand how our advanced security solutions work.
      </motion.p>
      
      <motion.div
        className="demo-details"
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.h2
          initial={{ opacity: 0 }} // Start with opacity 0
          animate={{ opacity: 1 }} // Animate to opacity 1
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          How it Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} // Start with opacity 0
          animate={{ opacity: 1 }} // Animate to opacity 1
          transition={{ delay: 1.5, duration: 1 }}
        >
          Our AI-powered detection system helps businesses and communities stay safer by providing real-time monitoring, alerts, and actionable insights.
        </motion.p>
      </motion.div>

      <motion.div
        className="cta"
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 2, duration: 1 }}
      >
        <a href="/sign-in" className="btn-primary">Sign Up for Full Access</a>
      </motion.div>
    </motion.div>
  );
}

export default Demo;
