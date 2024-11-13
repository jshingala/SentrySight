// Pricing.jsx
import { motion } from 'framer-motion';
import React, { useState } from "react";
import './Pricing.css'; // You'll need to adapt your CSS file

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

      {/* You can add your pricing cards/tiers here with similar motion effects */}
    </motion.div>
  );
}

export default Pricing;
