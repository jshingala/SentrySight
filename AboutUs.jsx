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
        About Sentry Sight
      </motion.h2>
      
      <motion.p
        initial={{ y: 50 }} // Start position (below)
        animate={{ y: 0 }} // Animate to original position
        transition={{ duration: 1 }}
      >
        At Sentry Sight, we believe in the power of technology to create safer spaces for everyone. By merging artificial intelligence with real-time detection systems, we bring the future of security to the present. Our solutions are crafted for businesses, schools, and communities seeking to proactively protect their spaces with precision and innovation.
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
        Our mission is to make security accessible, intelligent, and effortless for everyone. We are dedicated to developing AI-driven technologies that help detect potential risks early and effectively, reducing response time and enhancing overall safety.
      </motion.p>

      <motion.h3
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        What We Offer
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 2, duration: 1 }}
      >
        From AI-powered detection systems that monitor spaces in real-time to customizable alerts and analytics, our products are designed with user needs in mind. Sentry Sight provides solutions that fit seamlessly into daily operations, adding an extra layer of security without the complexity.
      </motion.p>

      <motion.h3
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        Meet Our Team
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 2.5, duration: 1 }}
      >
        Our team is composed of engineers, data scientists, and innovators driven by a commitment to safety and progress. With a collective background in AI, cybersecurity, and community safety, we bring a diverse skill set to every solution we create.
      </motion.p>

      <motion.h3
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        Join Us in Making a Safer Tomorrow
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Animate to opacity 1
        transition={{ delay: 3, duration: 1 }}
      >
        Whether you’re looking to secure your business or simply want to learn more about the future of safety technology, we welcome you to connect with us. Together, we can create safer environments for all.
      </motion.p>
    </motion.div>
  );
}

export default AboutUs;
