import React from "react";
import { motion } from "framer-motion";
import "./404.css";

function NotFound() {
  return (
    <motion.div
      className="not-found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <button
        onClick={() => (window.location.href = "/")}
        className="home-button"
      >
        Return to Homepage
      </button>
    </motion.div>
  );
}

export default NotFound;
