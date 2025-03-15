import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import './global.css';

const Modal = ({ isOpen, onClose, content }) => {
  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      position: 'relative',
      backgroundColor: '#333333',
      borderRadius: '15px',
      maxWidth: '90%',
      maxHeight: '90%',
      overflow: 'auto',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    },
    modalClose: {
      position: 'absolute',
      top: '10px',
      right: '15px',
      fontSize: '24px',
      background: 'none',
      border: 'none',
      color: '#d084f3',
      cursor: 'pointer',
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          style={styles.modalOverlay} 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="card"
            style={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              style={styles.modalClose} 
              onClick={onClose}
              onMouseOver={(e) => e.target.style.color = '#8a89e6'}
              onMouseOut={(e) => e.target.style.color = '#d084f3'}
            >
              &times;
            </button>
            <div>{content}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;