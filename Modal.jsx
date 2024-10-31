import React from 'react';
import './Modal.css'; // Import the CSS for modal styling

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
