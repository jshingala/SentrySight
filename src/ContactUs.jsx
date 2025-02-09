    import { motion } from 'framer-motion';
import React from 'react';
import './ContactUs.css';

    function ContactUs() {
    return (
        <main className="contact-wrapper">
        <div className="contact-container">
            <motion.div
            className="contact-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
            <h1>Contact Us</h1>
            <p>We're here to help</p>
            </motion.div>

            <div className="contact-cards">
            {/* Call Us Card */}
            <motion.div
                className="contact-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="contact-card-content">
                <div className="contact-icon phone">
                    <span>📞</span>
                </div>
                <h2>Call Us</h2>
                <p><a href="tel:1-844-GSA-4111">1-844-GSA-4111</a></p>
                </div>
            </motion.div>

            {/* Chat Live Card */}
            <motion.div
                className="contact-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="contact-card-content">
                <div className="contact-icon chat">
                    <span>💬</span>
                </div>
                <h2>Chat Live</h2>
                <p>We're available Sun 7:00pm EST - Friday 7:00pm EST</p>
                <button className="contact-button">Chat Now</button>
                </div>
            </motion.div>

            {/* Ask a Question Card */}
            <motion.div
                className="contact-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <div className="contact-card-content">
                <div className="contact-icon email">
                    <span>✉️</span>
                </div>
                <h2>Ask a Question</h2>
                <p>Fill out our form and we'll get back to you in 24 hours.</p>
                <button className="contact-button">Get Started</button>
                </div>
            </motion.div>
            </div>
        </div>
        </main>
    );
    }

    export default ContactUs;