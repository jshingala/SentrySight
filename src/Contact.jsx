import { motion } from 'framer-motion';
import React, { useState } from "react";
import './global.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent from ${formData.name}`);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const styles = {
    contactSection: {
      padding: '60px',
      maxWidth: '800px',
      margin: '50px auto',
    },
    contactTitle: {
      fontSize: '2.5rem',
      backgroundImage: 'linear-gradient(to right, #8a89e6, #d084f3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      marginBottom: '40px',
    },
    contactForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    input: {
      padding: '15px',
      backgroundColor: '#333333',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
    },
    textarea: {
      padding: '15px',
      backgroundColor: '#333333',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      minHeight: '150px',
      resize: 'vertical',
    }
  };

  return (
    <motion.section 
      className="card"
      style={styles.contactSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        style={styles.contactTitle}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h2>
      
      <motion.form 
        style={styles.contactForm} 
        onSubmit={handleSubmit}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          style={styles.input}
          whileFocus={{ boxShadow: '0 0 0 2px #8a89e6' }}
        />
        
        <motion.input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          style={styles.input}
          whileFocus={{ boxShadow: '0 0 0 2px #8a89e6' }}
        />
        
        <motion.textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          style={styles.textarea}
          whileFocus={{ boxShadow: '0 0 0 2px #8a89e6' }}
        ></motion.textarea>
        
        <motion.button 
          type="submit" 
          className="btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.section>
  );
}

export default Contact;