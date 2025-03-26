import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./demo.css";
import { motion } from "framer-motion";
import { useTranslation } from "./context/TranslationContext";
// These icons would typically be imported from a library like react-icons
// For this example, we'll use inline SVG components
const ThumbUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ThumbDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2z" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Warning icon for rate limit
const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" fill="currentColor"/>
  </svg>
);

function Demo({ userEmail }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { translateText, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState({});
  const [rating, setRating] = useState(null); // null, 'like', or 'dislike'
  const [ratingFeedback, setRatingFeedback] = useState('');
  const navigate = useNavigate();
  
  // Add state for rate limit warning
  const [rateLimitWarning, setRateLimitWarning] = useState(null);
  const [usageInfo, setUsageInfo] = useState(null);

  useEffect(() => {
    async function updateTranslations() {
      const texts = {
        demoTitle: "SentrySight Demo",
        demoDescription: "Experience the power of advanced security solutions with real-time monitoring and AI-powered insights.",
        tryItNow: "Try It Now",
        howItWorks: "How It Works",
        howItWorksDesc: "Our system leverages cutting-edge AI technology to analyze images and provide actionable security insights in real-time.",
        uploadTitle: "Upload an Image for Analysis",
        uploadPlaceholder: "Please select a file to upload.",
        uploadButton: "Upload Image",
        uploading: "Uploading...",
        running: "Running...",
        fullAccess: "Unlock Full Access",
        signUpNow: "Sign Up Now",
        fullAccessDesc: "Sign up today to gain complete access to all features and benefits of SentrySight.",
        loginRequired: "Please log in to experiment with our Demo function",
        loginButtonText: "Go to Login",
        rateResult: "How was the analysis?",
        likeText: "Helpful",
        dislikeText: "Not Helpful",
        thankYouRating: "Thank you for your feedback!",
        // Add rate limit translation strings
        rateLimitExceeded: "Rate limit exceeded. You can only make 5 requests per minute.",
        usageStatus: "Usage: {current}/{limit} requests - Resets in 1 minute"
      };

      const translated = {};
      for (const key in texts) {
        translated[key] = await translateText(texts[key], language);
      }
      setTranslatedText(translated);
    }

    updateTranslations();
  }, [language, translateText]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

      if (validImageTypes.includes(fileType)) {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setResult(null);
        setRating(null);
        setRatingFeedback('');
        // Clear any previous warnings when a new file is selected
        setRateLimitWarning(null);
      } else {
        alert("Please select a valid image file (JPEG, PNG, GIF, or WEBP).");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert(translatedText.uploadPlaceholder || "Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setIsProcessing(true);
    setProgress(0);
    setRating(null);
    setRatingFeedback('');
    // Clear any previous warnings
    setRateLimitWarning(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://3.133.147.122:3000/upload", {
        method: "POST",
        mode: "cors",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limit exceeded
          setRateLimitWarning(translatedText.rateLimitExceeded || "Rate limit exceeded. You can only make 5 requests per minute.");
          throw new Error("Rate limit exceeded");
        }
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      if (!data.imageUrl) {
        throw new Error("No imageUrl returned from server.");
      }
      
      // Set usage info if available in the response
      if (data.usage) {
        setUsageInfo(data.usage);
      }
      
      setResult(data.imageUrl + "?timestamp=" + new Date().getTime());
      setPreviewUrl(data.imageUrl + "?timestamp=" + new Date().getTime());
      setProgress(100);
    } catch (error) {
      console.error("Error uploading image:", error);
      if (!error.message.includes("Rate limit exceeded")) {
        alert("Error uploading image. Check console for details.");
      }
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/sign-in');
  };
  
  const handleRating = (type) => {
    setRating(type);
    setRatingFeedback(translatedText.thankYouRating || "Thank you for your feedback!");// deal with ratings later
        
  };

  // Enhanced animations and transitions
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const fadeInDelayed = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.3 }
  };

  // Not logged in view with improved styling
  if (!userEmail) {
    return (
      <div className="demo-container">
        <section className="hero-section">
          <div className="hero-content">
            <motion.h1 
              initial={{ opacity: 0, y: -30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
            >
              {translatedText.demoTitle || "SentrySight Demo"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {translatedText.loginRequired || "Please log in to experiment with our Demo function"}
            </motion.p>
            <motion.button 
              className="btn-primary" 
              onClick={handleLoginRedirect}
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(229, 57, 53, 0.4)" }}
            >
              {translatedText.loginButtonText || "Go to Login"}
            </motion.button>
          </div>
        </section>
      </div>
    );
  }

  // Logged in view - enhanced demo functionality
  return (
    <div className="demo-container">
      {/* Hero Section with enhanced animations */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            {translatedText.demoTitle || "SentrySight Demo"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {translatedText.demoDescription || "Experience the power of advanced security solutions with real-time monitoring and AI-powered insights."}
          </motion.p>
          <motion.a 
            href="#upload-section" 
            className="btn-primary"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(229, 57, 53, 0.4)" }}
          >
            {translatedText.tryItNow || "Try It Now"}
          </motion.a>
        </div>
      </section>

      {/* How It Works Section with improved layout */}
      <section className="how-it-works">
        <div className="content-wrapper">
          <motion.h2 
            {...fadeIn}
            viewport={{ once: true }}
          >
            {translatedText.howItWorks || "How It Works"}
          </motion.h2>
          <motion.p 
            {...fadeInDelayed}
            viewport={{ once: true }}
          >
            {translatedText.howItWorksDesc || "Our system leverages cutting-edge AI technology to analyze images and provide actionable security insights in real-time."}
          </motion.p>
        </div>
      </section>

      {/* Upload Section with improved UI elements */}
      <section className="upload-section" id="upload-section">
        <div className="content-wrapper">
          <motion.h3 
            {...fadeIn}
            viewport={{ once: true }}
          >
            {translatedText.uploadTitle || "Upload an Image for Analysis"}
          </motion.h3>
          
          {/* Rate limit warning display */}
          {rateLimitWarning && (
            <motion.div 
              className="rate-limit-warning"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="warning-icon"><WarningIcon /></span>
              {rateLimitWarning}
            </motion.div>
          )}

          {/* Usage information display */}
          {usageInfo && (
            <motion.div 
              className="usage-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p>
                {(translatedText.usageStatus || "Usage: {current}/{limit} requests - Resets in 1 minute")
                  .replace("{current}", usageInfo.current)
                  .replace("{limit}", usageInfo.limit)}
              </p>
              <div className="usage-bar-container">
                <div 
                  className={`usage-bar ${usageInfo.current / usageInfo.limit >= 0.8 ? 'warning' : ''} ${usageInfo.current / usageInfo.limit >= 1 ? 'critical' : ''}`} 
                  style={{ width: `${Math.min((usageInfo.current / usageInfo.limit) * 100, 100)}%` }}
                ></div>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            className="upload-controls"
            {...fadeInDelayed}
            viewport={{ once: true }}
          >
            <div className="file-input-container">
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            
            {previewUrl && (
              <motion.div 
                className="image-preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={previewUrl} alt="Uploaded Preview" />
              </motion.div>
            )}
            
            <motion.button 
              className="upload-button" 
              onClick={handleUpload} 
              disabled={isUploading || rateLimitWarning !== null}
              whileHover={!isUploading && !rateLimitWarning ? { scale: 1.05 } : {}}
              whileTap={!isUploading && !rateLimitWarning ? { scale: 0.95 } : {}}
            >
              {isUploading ? (
                <>
                  <span className="spinner"></span> {translatedText.uploading || "Uploading..."}
                </>
              ) : (
                translatedText.uploadButton || "Upload Image"
              )}
            </motion.button>
            
            {isProcessing && (
              <motion.div 
                className="progress-bar-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="progress-bar" 
                  style={{ width: `${progress}%` }}
                ></div>
              </motion.div>
            )}
          </motion.div>
          
          {(isProcessing || result) && (
            <motion.div 
              className="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isProcessing ? 
                translatedText.running || "Running..." : 
                <>
                  <img src={result} alt="Server Processed Result" />
                  
                  {result && !isProcessing && (
                    <motion.div 
                      className="rating-popup"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="rating-title">
                        {translatedText.rateResult || "How was the analysis?"}
                      </div>
                      <div className="rating-buttons">
                        <button 
                          className={`rating-btn like ${rating === 'like' ? 'selected' : ''}`}
                          onClick={() => handleRating('like')}
                          disabled={rating !== null}
                        >
                          <span className="thumb-icon"><ThumbUpIcon /></span>
                          <span className="btn-text">{translatedText.likeText || "Helpful"}</span>
                        </button>
                        <button 
                          className={`rating-btn dislike ${rating === 'dislike' ? 'selected' : ''}`}
                          onClick={() => handleRating('dislike')}
                          disabled={rating !== null}
                        >
                          <span className="thumb-icon"><ThumbDownIcon /></span>
                          <span className="btn-text">{translatedText.dislikeText || "Not Helpful"}</span>
                        </button>
                      </div>
                      <div className="rating-feedback">
                        {ratingFeedback}
                      </div>
                    </motion.div>
                  )}
                </>
              }
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section with enhanced visuals */}
      <section className="cta-section">
        <div className="content-wrapper">
          <motion.div 
            className="cta-content"
            {...fadeIn}
            viewport={{ once: true }}
          >
            <h2>{translatedText.fullAccess || "Unlock Full Access"}</h2>
            <p>{translatedText.fullAccessDesc || "Sign up today to gain complete access to all features and benefits of SentrySight."}</p>
            <motion.a 
              href="/sign-in" 
              className="btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(229, 57, 53, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              {translatedText.signUpNow || "Sign Up Now"}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Demo;