import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./demo.css";
import { motion } from "framer-motion";
import { useTranslation } from "./context/TranslationContext";
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

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" fill="currentColor"/>
  </svg>
);

// Add Security Response Comparison SVG Component
const SecurityComparisonSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700" className="security-comparison-svg">
    {/* Background */}
    <rect width="900" height="600" fill="#151723" rx="10" ry="10"/>
    
    {/* Title */}
    <text x="450" y="50" fontFamily="Arial" fontSize="26" fill="#ffffff" textAnchor="middle" fontWeight="bold">Security Response Comparison</text>
    
    {/* Two columns header */}
    <text x="225" y="100" fontFamily="Arial" fontSize="20" fill="#ed3c64" textAnchor="middle" fontWeight="bold">Traditional Approach</text>
    <text x="675" y="100" fontFamily="Arial" fontSize="20" fill="#8B7DEE" textAnchor="middle" fontWeight="bold">SentrySight AI System</text>
    
    {/* Dividing line */}
    <line x1="450" y1="80" x2="450" y2="580" stroke="#333" strokeWidth="2" strokeDasharray="10,5"/>
    
    {/* Traditional approach flow (left side) */}
    {/* Step 1: Threat Enters */}
    <rect x="125" y="150" width="200" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#666"/>
    <text x="225" y="177" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Threat Enters Premises</text>
    <text x="225" y="197" fontFamily="Arial" fontSize="14" fill="#b0b0b0" textAnchor="middle">No early detection</text>
    
    {/* Arrow down */}
    <line x1="225" y1="210" x2="225" y2="240" stroke="#666" strokeWidth="2"/>
    <polygon points="225,250 220,240 230,240" fill="#666"/>
    
    {/* Step 2: Incident Occurs */}
    <rect x="125" y="250" width="200" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#ed3c64"/>
    <text x="225" y="277" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Incident Occurs</text>
    <text x="225" y="297" fontFamily="Arial" fontSize="14" fill="#ed3c64" textAnchor="middle">Potential casualties</text>
    
    {/* Arrow down */}
    <line x1="225" y1="310" x2="225" y2="340" stroke="#666" strokeWidth="2"/>
    <polygon points="225,350 220,340 230,340" fill="#666"/>
    
    {/* Step 3: Witnesses Call 911 */}
    <rect x="125" y="350" width="200" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#666"/>
    <text x="225" y="377" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Witnesses Call 911</text>
    <text x="225" y="397" fontFamily="Arial" fontSize="14" fill="#b0b0b0" textAnchor="middle">3-5 minute delay</text>
    
    {/* Arrow down */}
    <line x1="225" y1="410" x2="225" y2="440" stroke="#666" strokeWidth="2"/>
    <polygon points="225,450 220,440 230,440" fill="#666"/>
    
    {/* Step 4: Police Respond */}
    <rect x="125" y="450" width="200" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#666"/>
    <text x="225" y="477" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Police Respond</text>
    <text x="225" y="497" fontFamily="Arial" fontSize="14" fill="#b0b0b0" textAnchor="middle">Rely on witness accounts</text>
    
    {/* Arrow down */}
    <line x1="225" y1="510" x2="225" y2="540" stroke="#666" strokeWidth="2"/>
    <polygon points="225,550 220,540 230,540" fill="#666"/>
    
    {/* Step 5: Threat Neutralized */}
    <rect x="125" y="550" width="200" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#666"/>
    <text x="225" y="580" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Threat Neutralized</text>
    <text x="225" y="600" fontFamily="Arial" fontSize="14" fill="#b0b0b0" textAnchor="middle">Average time: 10-20 minutes</text>
    
    {/* Response time indicator */}
    <rect x="50" y="150" width="30" height="460" fill="rgba(237, 60, 100, 0.1)" stroke="none"/>
    <text x="65" y="335" fontFamily="Arial" fontSize="14" fill="#ed3c64" textAnchor="middle" transform="rotate(-90, 65, 335)">RESPONSE TIME: 10-20 MINUTES</text>
    
    {/* SentrySight AI approach flow (right side) */}
    {/* Step 1: Early Threat Detection */}
    <rect x="575" y="150" width="200" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#8B7DEE"/>
    <text x="675" y="177" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Early Threat Detection</text>
    <text x="675" y="197" fontFamily="Arial" fontSize="14" fill="#8B7DEE" textAnchor="middle">AI identifies weapon outside</text>
    
    {/* Arrow down with branch */}
    <line x1="675" y1="210" x2="675" y2="225" stroke="#8B7DEE" strokeWidth="2"/>
    {/* Branch left */}
    <line x1="675" y1="225" x2="610" y2="225" stroke="#8B7DEE" strokeWidth="2"/>
    <line x1="610" y1="225" x2="610" y2="240" stroke="#8B7DEE" strokeWidth="2"/>
    <polygon points="610,250 605,240 615,240" fill="#8B7DEE"/>
    {/* Branch right */}
    <line x1="675" y1="225" x2="740" y2="225" stroke="#8B7DEE" strokeWidth="2"/>
    <line x1="740" y1="225" x2="740" y2="240" stroke="#8B7DEE" strokeWidth="2"/>
    <polygon points="740,250 735,240 745,240" fill="#8B7DEE"/>
    
    {/* Step 2A: Prevention Outside */}
    <rect x="510" y="250" width="150" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#8B7DEE"/>
    <text x="585" y="277" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Prevention Outside</text>
    <text x="585" y="297" fontFamily="Arial" fontSize="14" fill="#b0b0b0" textAnchor="middle">Incident avoided</text>
    
    {/* Step 2B: Immediate Alert */}
    <rect x="690" y="250" width="150" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#8B7DEE"/>
    <text x="765" y="277" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Immediate Alert</text>
    <text x="765" y="297" fontFamily="Arial" fontSize="14" fill="#b0b0b0" textAnchor="middle">If threat enters</text>
    
    {/* Arrow down from 2B */}
    <line x1="765" y1="310" x2="765" y2="340" stroke="#8B7DEE" strokeWidth="2"/>
    <polygon points="765,350 760,340 770,340" fill="#8B7DEE"/>
    
    {/* Step 3: Automated Police Notification */}
    <rect x="690" y="350" width="150" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#8B7DEE"/>
    <text x="765" y="377" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Police Notification</text>
    <text x="765" y="397" fontFamily="Arial" fontSize="14" fill="#b0b0b0" textAnchor="middle">Automatic alert sent</text>
    
    {/* Arrow down */}
    <line x1="765" y1="410" x2="765" y2="440" stroke="#8B7DEE" strokeWidth="2"/>
    <polygon points="765,450 760,440 770,440" fill="#8B7DEE"/>
    
    {/* Step 4: Data Sharing */}
    <rect x="690" y="450" width="150" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#8B7DEE"/>
    <text x="765" y="477" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Detailed Intel Shared</text>
    <text x="765" y="497" fontFamily="Arial" fontSize="14" fill="#b0b0b0" textAnchor="middle">Location, images, status</text>
    
    {/* Arrow down */}
    <line x1="765" y1="510" x2="765" y2="540" stroke="#8B7DEE" strokeWidth="2"/>
    <polygon points="765,550 760,540 770,540" fill="#8B7DEE"/>
    
    {/* Step 5: Swift Response */}
    <rect x="690" y="550" width="150" height="60" rx="10" ry="10" fill="#1c1e2a" stroke="#8B7DEE"/>
    <text x="765" y="580" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle">Swift Response</text>
    <text x="765" y="600" fontFamily="Arial" fontSize="14" fill="#b0b0b0" textAnchor="middle">Average time: 1-2 minutes</text>
    
    {/* Response time indicator */}
    <rect x="860" y="150" width="30" height="460" fill="rgba(139, 125, 238, 0.1)" stroke="none"/>
    <text x="875" y="335" fontFamily="Arial" fontSize="14" fill="#8B7DEE" textAnchor="middle" transform="rotate(-90, 875, 335)">RESPONSE TIME: 1-2 MINUTES</text>
    
    {/* Connection between prevention and end */}
    <line x1="585" y1="310" x2="585" y2="580" stroke="#8B7DEE" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="585" y="535" fontFamily="Arial" fontSize="14" fill="#8B7DEE" textAnchor="middle">No casualties</text>
    
    {/* Key differences callout */}
    <rect x="375" y="280" width="150" height="140" rx="10" ry="10" fill="rgba(0,0,0,0.3)" stroke="#ed3c64"/>
    <text x="450" y="305" fontFamily="Arial" fontSize="16" fill="#ffffff" textAnchor="middle" fontWeight="bold">Key Differences</text>
    <line x1="400" y1="315" x2="500" y2="315" stroke="#666" strokeWidth="1"/>
    
    <text x="390" y="335" fontFamily="Arial" fontSize="12" fill="#ffffff" textAnchor="start">• Prevention vs. Reaction</text>
    <text x="390" y="360" fontFamily="Arial" fontSize="12" fill="#ffffff" textAnchor="start">• 90% faster response</text>
    <text x="390" y="385" fontFamily="Arial" fontSize="12" fill="#ffffff" textAnchor="start">• Accurate information</text>
    <text x="390" y="410" fontFamily="Arial" fontSize="12" fill="#ffffff" textAnchor="start">• Potential lives saved</text>
    
    {/* Arrows pointing to key differences */}
    <line x1="325" y1="350" x2="375" y2="350" stroke="#ed3c64" strokeWidth="1" strokeDasharray="3,3"/>
    <line x1="575" y1="350" x2="525" y2="350" stroke="#8B7DEE" strokeWidth="1" strokeDasharray="3,3"/>
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
        securityComparison: "Security Response Comparison",
        securityComparisonDesc: "See how SentrySight's AI system dramatically improves response time compared to traditional security approaches.",
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
      
      {/* Security Response Comparison Section - ADDED */}
      <section className="security-comparison-section">
        <div className="content-wrapper">
          <motion.h2 
            {...fadeIn}
            viewport={{ once: true }}
          >
            {translatedText.securityComparison || "Security Response Comparison"}
          </motion.h2>
          <motion.p 
            {...fadeInDelayed}
            viewport={{ once: true }}
          >
            {translatedText.securityComparisonDesc || "See how SentrySight's AI system dramatically improves response time compared to traditional security approaches."}
          </motion.p>
          
          <motion.div 
            className="security-comparison-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <SecurityComparisonSVG />
          </motion.div>
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