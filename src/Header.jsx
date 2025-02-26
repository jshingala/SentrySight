import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "./context/TranslationContext";
import Logo from "./assets/Logo.png";
import "./header.css";

function Header({ userEmail }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  // We get these from the context:
  const { changeLanguage, translateText, language } = useTranslation();

  // We'll store translations for various text keys here
  const [translatedText, setTranslatedText] = useState({});

  useEffect(() => {
    // We define the strings we want to translate:
    const texts = {
      about: "About Us",
      demo: "Demo",
      faq: "FAQ",
      questionnaire: "Questionnaire",
      pricing: "Pricing",
      profile: "Profile",
      signIn: "Register / Sign In",
      admin: "Admin",
    };

    // Translate them whenever the language changes
    async function updateTranslations() {
      const newTranslations = {};
      for (const key in texts) {
        newTranslations[key] = await translateText(texts[key]);
      }
      setTranslatedText(newTranslations);
    }

    updateTranslations();
  }, [language, translateText]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setLightMode(!lightMode);
    document.body.classList.toggle("light-mode");
  };

  return (
    <header className={`header ${lightMode ? "light-mode" : ""}`}>
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={Logo} alt="Logo" className="logo-image" />
          <h1>SentrySight</h1>
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="nav-desktop">
        <ul className="nav-list">
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              {translatedText.about || "About Us"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/demo">
              {translatedText.demo || "Demo"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/faq">
              {translatedText.faq || "FAQ"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/questionnaire">
              {translatedText.questionnaire || "Questionnaire"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pricing">
              {translatedText.pricing || "Pricing"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={userEmail ? "/profile" : "/sign-in"}>
              {userEmail
                ? translatedText.profile || "Profile"
                : translatedText.signIn || "Register / Sign In"}
            </Link>
          </li>
          <li className="nav-item toggle-btn" onClick={toggleTheme}>
            ☀️
          </li>
          <li className="nav-item">
            <button onClick={() => changeLanguage("en")}>🇬🇧</button>
            <button onClick={() => changeLanguage("es")}>🇪🇸</button>
            <button onClick={() => changeLanguage("fr")}>🇫🇷</button>
          </li>
        </ul>
      </nav>

      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5 }}
          >
            <div className="back-arrow" onClick={toggleMenu}>
              &#8592;
            </div>
            <ul className="nav-list">
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={toggleMenu}>
                  {translatedText.about || "About Us"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/demo" onClick={toggleMenu}>
                  {translatedText.demo || "Demo"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pricing" onClick={toggleMenu}>
                  {translatedText.pricing || "Pricing"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faq" onClick={toggleMenu}>
                  {translatedText.faq || "FAQ"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/questionnaire" onClick={toggleMenu}>
                  {translatedText.questionnaire || "Questionnaire"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sign-in" onClick={toggleMenu}>
                  {translatedText.signIn || "Register / Sign In"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin" onClick={toggleMenu}>
                  {translatedText.admin || "Admin"}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
