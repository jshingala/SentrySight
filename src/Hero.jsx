import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      {/* Background YouTube Video */}
      <div className="hero-video">
        <iframe
          src="https://www.youtube.com/embed/7ilMLBuujQc?autoplay=1&mute=1&loop=1&playlist=7ilMLBuujQc" // Loop by adding playlist ID
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Background Video"
        ></iframe>
      </div>

      {/* Hero Content */}
      <motion.div className="hero-content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          Experience peace of mind with cutting-edge technology that keeps your home and business safe.
        </motion.p>
        <div className="cta-buttons">
          <motion.a
            href="#get-started"
            className="btn-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          >
            Get Started
          </motion.a>
          <motion.a
            href="#learn-more"
            className="btn-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            Learn More
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
