import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Replace this with your actual Google Cloud Translate API key
const API_KEY = "AIzaSyARalwcQt_QuX2b3VE9Wln-r8CehdwUrsw";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  // We'll keep a nested object: translations[lang][text]
  const [translations, setTranslations] = useState({});

  // A simple function to update language (aka "changeLanguage")
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // The translation function always uses context's `language`
  const translateText = async (text) => {
    // If language is English, just return the original text
    if (language === "en") {
      return text;
    }

    // If we already have a translation cached, return it
    if (translations[language]?.[text]) {
      return translations[language][text];
    }

    try {
      // Send request to Google Translate
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
          q: text,
          target: language,
        }
      );

      const translated = response.data.data.translations[0].translatedText;

      // Cache the translation in state
      setTranslations((prev) => ({
        ...prev,
        [language]: {
          ...(prev[language] || {}),
          [text]: translated,
        },
      }));

      return translated;
    } catch (error) {
      console.error("Translation error:", error);
      // If an error occurs, return the original text
      return text;
    }
  };

  return (
    <TranslationContext.Provider
      value={{ language, changeLanguage, translateText }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};