// AboutUs.jsx
import React from "react";
import './AboutUs.css'; // Import the CSS file for styling
import { motion } from 'framer-motion';

function AboutUs() {
  return (
    <motion.div
      className="about-us"
      initial={{ opacity: 0 }} // Start with opacity 0
      animate={{ opacity: 1 }} // Animate to opacity 1
      transition={{ duration: 1 }} // Set the duration for the transition
    >
      <motion.h2
        initial={{ x: -200 }} // Start position (off-screen left)
        animate={{ x: 0 }} // Animate to original position
        transition={{ duration: 1 }}
      >
        About Us
      </motion.h2>
      
      <motion.p
        initial={{ y: 50 }} // Start position (below)
        animate={{ y: 0 }} // Animate to original position
        transition={{ duration: 1 }}
      >
        Welcome to Sentry Sight. We specialize in providing AI-powered safety solutions for communities and businesses. Our goal is to make environments safer through advanced technology.
      </motion.p>
      
      <motion.h3
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Our Mission
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 1.5, duration: 1 }}
      >
        Our mission is to enhance safety and security in everyday life by leveraging cutting-edge AI technologies.
      </motion.p>
      
      <motion.h3
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        Our Team
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 2, duration: 1 }}
      >
        Our team is made up of dedicated professionals with a passion for innovation and community safety.
      </motion.p>
    </motion.div>
  );
}

export default AboutUs;
