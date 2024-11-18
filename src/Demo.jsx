import React, { useState } from 'react';
import './demo.css';
import { motion } from 'framer-motion';

function Demo() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (validImageTypes.includes(fileType)) {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WEBP).');
      }
    }
  };

  const handleUpload = () => {
    if (file) {
      setIsUploading(true);

      // Simulate an upload process
      setTimeout(() => {
        setIsUploading(false);
        alert(`File "${file.name}" has been uploaded successfully!`);
        setFile(null);
        setPreviewUrl(null);
      }, 2000);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="demo-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            SentrySight Demo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Experience the power of advanced security solutions with real-time monitoring and AI-powered insights.
          </motion.p>
          <motion.a
            href="#upload-section"
            className="btn-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Try It Now
          </motion.a>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="content-wrapper">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Our system leverages cutting-edge AI technology to analyze images and provide actionable security insights in real-time.
          </motion.p>
          {/* Video Section */}
          <motion.div
            className="video-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <video
              src="/videoBg.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="video-content"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section" id="upload-section">
        <div className="content-wrapper">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Upload an Image for Analysis
          </motion.h3>
          <motion.div
            className="upload-controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Uploaded Preview" />
              </div>
            )}
            <button
              className="upload-button"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className="spinner"></span> Uploading...
                </>
              ) : (
                'Upload Image'
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="content-wrapper">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2>Unlock Full Access</h2>
            <p>
              Sign up today to gain complete access to all features and benefits of SentrySight.
            </p>
            <a href="/sign-in" className="btn-secondary">
              Sign Up Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Demo;
