import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "./context/TranslationContext";
import Logo from "./assets/Logo.png";
import "./header.css";

function Header({ userEmail, isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const location = useLocation(); // Get current location

  const { changeLanguage, translateText, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState({});

  useEffect(() => {
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

  // Function to determine if a link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Adding inline style to force white background
  return (
    <header className="header" style={{backgroundColor: 'white', color: '#333333'}}>
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={Logo} alt="Logo" className="logo-image" />
          <h1>SentrySight</h1>
        </Link>
      </div>

      <nav className="nav-desktop">
        <ul className="nav-list">
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
              to="/about"
            >
              {translatedText.about || "About Us"}
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActiveLink('/demo') ? 'active' : ''}`}
              to="/demo"
            >
              {translatedText.demo || "Demo"}
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActiveLink('/faq') ? 'active' : ''}`}
              to="/faq"
            >
              {translatedText.faq || "FAQ"}
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActiveLink(isAdmin ? '/questionnaire_A' : '/questionnaire') ? 'active' : ''}`}
              to={isAdmin ? "/questionnaire_A" : "/questionnaire"}
            >
              {translatedText.questionnaire || "Questionnaire"}
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActiveLink('/pricing') ? 'active' : ''}`}
              to="/pricing"
            >
              {translatedText.pricing || "Pricing"}
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActiveLink(userEmail ? '/profile' : '/sign-in') ? 'active' : ''}`}
              to={userEmail ? "/profile" : "/sign-in"}
            >
              {userEmail
                ? translatedText.profile || "Profile"
                : translatedText.signIn || "Register / Sign In"}
            </Link>
          </li>
          <li className="nav-item toggle-btn" onClick={toggleTheme}>
            {lightMode ? "🌙" : "☀️"}
          </li>

          {/* Language Dropdown */}
          <li className="nav-item translation-dropdown">
            <select
              className="lang-select"
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
            </select>
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
            style={{backgroundColor: 'white', color: '#333333'}}
          >
            <div className="back-arrow" onClick={toggleMenu}>
              &#8592;
            </div>
            <ul className="nav-list">
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
                  to="/about" 
                  onClick={toggleMenu}
                >
                  {translatedText.about || "About Us"}
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActiveLink('/demo') ? 'active' : ''}`}
                  to="/demo" 
                  onClick={toggleMenu}
                >
                  {translatedText.demo || "Demo"}
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActiveLink('/pricing') ? 'active' : ''}`}
                  to="/pricing" 
                  onClick={toggleMenu}
                >
                  {translatedText.pricing || "Pricing"}
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActiveLink('/faq') ? 'active' : ''}`}
                  to="/faq" 
                  onClick={toggleMenu}
                >
                  {translatedText.faq || "FAQ"}
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActiveLink(isAdmin ? '/questionnaire_A' : '/questionnaire') ? 'active' : ''}`}
                  to={isAdmin ? "/questionnaire_A" : "/questionnaire"} 
                  onClick={toggleMenu}
                >
                  {translatedText.questionnaire || "Questionnaire"}
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActiveLink(userEmail ? '/profile' : '/sign-in') ? 'active' : ''}`}
                  to={userEmail ? "/profile" : "/sign-in"} 
                  onClick={toggleMenu}
                >
                  {userEmail
                    ? translatedText.profile || "Profile"
                    : translatedText.signIn || "Register / Sign In"}
                </Link>
              </li>
              {isAdmin && (
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActiveLink('/admin') ? 'active' : ''}`}
                    to="/admin" 
                    onClick={toggleMenu}
                  >
                    {translatedText.admin || "Admin"}
                  </Link>
                </li>
              )}
              
              {/* Mobile Language Selector */}
              <li className="nav-item translation-dropdown mobile-lang">
                <select
                  className="lang-select"
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <option value="en">🇬🇧 English</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="fr">🇫🇷 Français</option>
                </select>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;