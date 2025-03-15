import { motion } from 'framer-motion';
import React, { useState } from 'react';
import './global.css';

function Demo() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const styles = {
    demoContainer: {
      width: '100%',
    },
    heroSection: {
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 20px',
    },
    heroContent: {
      maxWidth: '800px',
    },
    heroTitle: {
      fontSize: '3.5rem',
      marginBottom: '20px',
      backgroundImage: 'linear-gradient(to right, #8a89e6, #d084f3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    heroParagraph: {
      fontSize: '1.2rem',
      color: '#bfbfbf',
      marginBottom: '30px',
      lineHeight: '1.6',
    },
    section: {
      padding: '80px 20px',
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#d084f3',
    },
    sectionParagraph: {
      fontSize: '1.1rem',
      color: '#bfbfbf',
      marginBottom: '40px',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto 40px auto',
    },
    videoContainer: {
      width: '100%',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
    },
    videoContent: {
      width: '100%',
      display: 'block',
    },
    uploadSection: {
      textAlign: 'center',
    },
    uploadControls: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '30px',
    },
    fileInput: {
      backgroundColor: '#333333',
      padding: '15px',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px',
      color: '#FFFFFF',
    },
    imagePreview: {
      maxWidth: '500px',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    previewImage: {
      width: '100%',
      display: 'block',
    },
    spinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTopColor: '#FFFFFF',
      animation: 'spin 1s ease-in-out infinite',
      marginRight: '10px',
    },
    result: {
      marginTop: '30px',
    },
    resultImage: {
      maxWidth: '100%',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    ctaSection: {
      textAlign: 'center',
      padding: '60px 20px',
    },
    ctaContent: {
      maxWidth: '600px',
      margin: '0 auto',
    },
    ctaTitle: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      color: '#d084f3',
    },
    ctaParagraph: {
      fontSize: '1.1rem',
      color: '#bfbfbf',
      marginBottom: '30px',
    },
    '@keyframes spin': {
      to: { transform: 'rotate(360deg)' }
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (validImageTypes.includes(fileType)) {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setResult(null);
      } else {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WEBP).');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setIsProcessing(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Explicitly set mode: 'cors'
      const response = await fetch('http://3.133.147.122:3000/upload', {
        method: 'POST',
        mode: 'cors',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.imageUrl) {
        throw new Error('No imageUrl returned from server.');
      }
      setResult(data.imageUrl + '?timestamp=' + new Date().getTime());
      setPreviewUrl(data.imageUrl + '?timestamp=' + new Date().getTime());
      setProgress(100);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Check console for details.');
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div style={styles.demoContainer}>
      <section className="card" style={styles.heroSection}>
        <div style={styles.heroContent}>
          <motion.h1
            style={styles.heroTitle}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            SentrySight Demo
          </motion.h1>
          <motion.p
            style={styles.heroParagraph}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Experience the power of advanced security solutions with real-time monitoring and AI-powered insights.
          </motion.p>
          <motion.a
            href="#upload-section"
            className="btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Try It Now
          </motion.a>
        </div>
      </section>

      <section className="card" style={{...styles.section, ...styles.howItWorks}}>
        <div style={styles.contentWrapper}>
          <motion.h2
            style={styles.sectionTitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            style={styles.sectionParagraph}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Our system leverages cutting-edge AI technology to analyze images and provide actionable security insights in real-time.
          </motion.p>
          <motion.div
            style={styles.videoContainer}
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
              style={styles.videoContent}
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      <section className="card" style={{...styles.section, ...styles.uploadSection}} id="upload-section">
        <div style={styles.contentWrapper}>
          <motion.h3
            style={styles.sectionTitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Upload an Image for Analysis
          </motion.h3>
          <motion.div
            style={styles.uploadControls}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              style={styles.fileInput}
            />
            {previewUrl && (
              <div style={styles.imagePreview}>
                <img src={previewUrl} alt="Uploaded Preview" style={styles.previewImage} />
              </div>
            )}
            <motion.button
              className="btn"
              onClick={handleUpload}
              disabled={isUploading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isUploading ? (
                <>
                  <span style={styles.spinner}></span> Uploading...
                </>
              ) : (
                'Upload Image'
              )}
            </motion.button>
          </motion.div>
          {(isProcessing || result) && (
            <div style={styles.result}>
              {isProcessing ? (
                "Running..."
              ) : (
                <img src={result} alt="Server Processed Result" style={styles.resultImage} />
              )}
            </div>
          )}
        </div>
      </section>

      <section className="card" style={{...styles.section, ...styles.ctaSection}}>
        <div style={styles.contentWrapper}>
          <motion.div
            style={styles.ctaContent}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 style={styles.ctaTitle}>Unlock Full Access</h2>
            <p style={styles.ctaParagraph}>
              Sign up today to gain complete access to all features and benefits of SentrySight.
            </p>
            <motion.a 
              href="/sign-in" 
              className="btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up Now
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Demo;