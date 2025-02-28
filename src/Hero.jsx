import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "./context/TranslationContext"; // Import translation hook
import "./Hero.css";

const Hero = () => {
  const { translateText, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState({});

  useEffect(() => {
    const texts = {
      heading: "Experience Peace of Mind",
      description: "Cutting-edge technology to keep your home and business safe.",
    };

    async function updateTranslations() {
      const newTranslations = {};
      for (const key in texts) {
        newTranslations[key] = await translateText(texts[key]);
      }
      setTranslatedText(newTranslations);
    }

    updateTranslations();
  }, [language, translateText]);

  return (
    <div className="hero">
      {/* Hero Content */}
      <motion.div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          {translatedText.heading || "Experience Peace of Mind"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          {translatedText.description || "Cutting-edge technology to keep your home and business safe."}
        </motion.p>
        <div className="cta-buttons">
          <motion.a
            href="/sign-in"
            className="btn-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            Get Started
          </motion.a>
          <motion.a
            href="/demo"
            className="btn-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          >
            Learn More
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
