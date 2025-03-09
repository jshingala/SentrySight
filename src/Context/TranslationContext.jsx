import React, { createContext, useContext, useState } from "react";
import axios from "axios";


const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;


const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState("en");

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const translateText = async (text) => {
    // If language is English, just return the original text
    if (language === "en") {
      return text;
    }

   
    if (translations[language]?.[text]) {
      return translations[language][text];
    }

    try {
      // Call Google Translate API
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
          q: text,
          target: language,
        }
      );

      const translated = response.data.data.translations[0].translatedText;

      
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
      
      return text;
    }
  };

  return (
    <TranslationContext.Provider
      value={{
        translateText,
        language,
        changeLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};