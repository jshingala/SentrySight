import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './VideoSection.css';
import sampleVideo from '../public/VideoBg.mp4';

const VideoSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 28;
      videoRef.current.play();
    }
  }, []);

  return (
    <section className="video-section">
      <div className="video-section-container">
        <div className="left-video-container">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="demo-video"
          >
            <source src={sampleVideo} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>

        <div className="right-text-container">
          <div className="text-content">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Advanced Threat Detection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our AI-powered system identifies threats in real-time, ensuring maximum safety for your home and business. Get instant alerts and take immediate action.
            </motion.p>

            <div className="cta-buttons">
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
            </div>

            <div className="detection-box">
              <motion.div
                className="detection-marker"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
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
        </div>
      </div>
    </section>
  );
};

export default VideoSection;