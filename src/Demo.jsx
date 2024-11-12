import React, { useState } from 'react';
import './demo.css';
import { motion } from 'framer-motion';

function Demo() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = () => {
    if (file) {
      alert(`File "${file.name}" is ready to be uploaded!`);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <motion.div
      className="demo-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 initial={{ x: -200 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
        Demo Page
      </motion.h1>

      <motion.p initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
        Welcome to the SentrySight Demo. Here, you'll experience firsthand how our advanced security solutions work.
      </motion.p>

      <motion.div
        className="demo-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
          How it Works
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
          Our AI-powered detection system helps businesses and communities stay safer by providing real-time monitoring, alerts, and actionable insights.
        </motion.p>
      </motion.div>

      <motion.div
        className="upload-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <h3>Upload an Image for Analysis</h3>
        <input type="file" onChange={handleFileChange} />
        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Uploaded Preview" />
          </div>
        )}
        <button className="upload-button" onClick={handleUpload}>
          Upload Image
        </button>
      </motion.div>

      <motion.div
        className="cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <a href="/sign-in" className="btn-primary">Sign Up for Full Access</a>
      </motion.div>
    </motion.div>
  );
}

export default Demo;
