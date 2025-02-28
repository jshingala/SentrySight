import React, { useState, useEffect } from "react";
import "./demo.css";
import { motion } from "framer-motion";
import { useTranslation } from "./context/TranslationContext"; // Import translation hook

function Demo() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { translateText, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState({});

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

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://3.133.147.122:3000/upload", {
        method: "POST",
        mode: "cors",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.imageUrl) {
        throw new Error("No imageUrl returned from server.");
      }
      setResult(data.imageUrl + "?timestamp=" + new Date().getTime());
      setPreviewUrl(data.imageUrl + "?timestamp=" + new Date().getTime());
      setProgress(100);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Check console for details.");
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="demo-container">
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            {translatedText.demoTitle || "SentrySight Demo"}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            {translatedText.demoDescription || "Experience the power of advanced security solutions with real-time monitoring and AI-powered insights."}
          </motion.p>
          <motion.a href="#upload-section" className="btn-primary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}>
            {translatedText.tryItNow || "Try It Now"}
          </motion.a>
        </div>
      </section>
      <section className="how-it-works">
        <div className="content-wrapper">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            {translatedText.howItWorks || "How It Works"}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            {translatedText.howItWorksDesc || "Our system leverages cutting-edge AI technology to analyze images and provide actionable security insights in real-time."}
          </motion.p>
        </div>
      </section>
      <section className="upload-section" id="upload-section">
        <div className="content-wrapper">
          <motion.h3 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            {translatedText.uploadTitle || "Upload an Image for Analysis"}
          </motion.h3>
          <motion.div className="upload-controls" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Uploaded Preview" />
              </div>
            )}
            <button className="upload-button" onClick={handleUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <span className="spinner"></span> {translatedText.uploading || "Uploading..."}
                </>
              ) : (
                translatedText.uploadButton || "Upload Image"
              )}
            </button>
          </motion.div>
          {(isProcessing || result) && (
            <div className="result">
              {isProcessing ? translatedText.running || "Running..." : <img src={result} alt="Server Processed Result" />}
            </div>
          )}
        </div>
      </section>
      <section className="cta-section">
        <div className="content-wrapper">
          <motion.div className="cta-content" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2>{translatedText.fullAccess || "Unlock Full Access"}</h2>
            <p>{translatedText.fullAccessDesc || "Sign up today to gain complete access to all features and benefits of SentrySight."}</p>
            <a href="/sign-in" className="btn-secondary">
              {translatedText.signUpNow || "Sign Up Now"}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Demo;
