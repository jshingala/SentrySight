// Pricing.jsx
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import './pricing.css';

function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <motion.div
      className="pricing-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        Simple, Transparent Pricing
      </motion.h2>
      
      <motion.p
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className="pricing-subtitle"
      >
        Choose the perfect plan to secure your space with Sentry Sight's AI-powered protection.
      </motion.p>

      <motion.div 
        className="pricing-toggle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <button 
          className={billingCycle === 'monthly' ? 'active' : ''}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button 
          className={billingCycle === 'annual' ? 'active' : ''}
          onClick={() => setBillingCycle('annual')}
        >
          Annual
          <span className="save-badge">Save 20%</span>
        </button>
      </motion.div>
        {/* Premium Subscription */}
        <motion.div 
          className="price-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="price-header premium">
            <h2>PREMIUM SUBSCRIPTION</h2>
          </div>
          <div className="price-amount">
            <h3>$50/camera/month</h3>
          </div>
          <div className="price-features">
            <ul>
              <li>All of the previous subscription benefits PLUS additional safety detection features tailored for businesses</li>
              <li>Receive further discounts by opting for an extended contract term</li>
            </ul>
          </div>
        </motion.div>
        <motion.div 
          className="contact-button-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/contact" className="contact-button">
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
  );
}

export default Pricing;
