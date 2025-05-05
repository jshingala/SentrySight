import React from "react";
import { motion } from "framer-motion";
import "./global.css";
import "./homepage.css";

const buttonVariant = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

const CTA = () => {
  return (
    <section className="cta">
      <div className="container">
        <motion.h2 className="cta-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Ready to Get Started?
        </motion.h2>
        <motion.p className="cta-subtext" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
          Take the first step towards smarter security solutions.
        </motion.p>
        <motion.div className="cta-buttons-container">
          <motion.div className="cta-buttons">
            <motion.button variants={buttonVariant} whileHover="hover" className="btn btn-primary">
              Sign Up
            </motion.button>
            <motion.button variants={buttonVariant} whileHover="hover" className="btn btn-secondary">
              See Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;