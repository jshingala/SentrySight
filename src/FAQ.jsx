// FAQ.jsx
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import "./global.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is Sentry Sight?",
      answer:
        "Sentry Sight is a security solution designed to help you stay safe. We provide a AI-driven technology that helps detect any potential risk of a firearm, providing an efficient and effective security metric. Our platform combines real-time monitoring, intelligent threat detection, and instant notifications to provide comprehensive sec",
    },
    {
      question: "How does it work?",
      answer:
        "Our system utilizes advanced technology to monitor and protect you. When unusual activity is detected, our AI analyzes the situation using advanced computer vision algorithms to determine potential threats. If a security concern is identified, you'll receive immediate notifications through our website or mobile app. The entire process happens within seconds, ensuring rapid response to any security incidents.",
    },
    {
      question: "Can I customize my settings?",
      answer: "Absolutely! Sentry Sight offers extensive customization options to ensure the system works exactly as you need it to. You can define specific monitoring zones, set up notification preferences, and create unique security protocols for different scenarios. Our intuitive interface makes it easy to modify these settings at any time, and our support team is always available to help you optimize your configuration.",
    },
    {
      question: "What devices are compatible?",
      answer:
        "Our solution is compatible with most modern devices, including smartphones, tablets, and desktops. The Sentry Sight mobile app is available for both iOS and Android smartphones and tablets, with full functionality on the latest versions. For desktop users, we offer a web-based dashboard that works on all major browsers including Chrome, Firefox, Safari, and Edge.",
    },
    {
      question: "Is there a trial version?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all features during this period, you can test our advanced AI detection capabilities, mobile app functionality, and customization options without any commitment. After the trial period, you can choose from our different subscription plans to pick the best that suits your needs.",
    },
  ];

  const toggleAnswer = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const styles = {
    faqSection: {
      maxWidth: '1000px',
      margin: '60px auto',
      padding: '40px 20px',
    },
    faqTitle: {
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '40px',
      backgroundImage: 'linear-gradient(to right, #8a89e6, #d084f3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    faqList: {
      listStyle: 'none',
      padding: 0,
    },
    faqItem: {
      marginBottom: '15px',
      borderRadius: '10px',
      overflow: 'hidden',
      backgroundColor: '#333333',
      transition: 'box-shadow 0.3s ease',
    },
    faqItemActive: {
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
    },
    faqQuestion: {
      padding: '20px 25px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      color: '#FFFFFF',
      transition: 'background-color 0.3s ease',
    },
    faqQuestionActive: {
      backgroundColor: '#444444',
    },
    faqIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#8a89e6',
      transform: 'rotate(45deg)',
      transition: 'transform 0.3s ease',
    },
    faqIconClosed: {
      transform: 'rotate(0deg)',
    },
    faqAnswer: {
      padding: '0 25px 20px 25px',
      color: '#bfbfbf',
      lineHeight: '1.6',
      fontSize: '1rem',
    }
  };

  return (
    <motion.section 
      className="card"
      style={styles.faqSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        style={styles.faqTitle}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Frequently Asked Questions
      </motion.h2>
      <ul style={styles.faqList}>
        {questions.map((item, index) => (
          <motion.li
            key={index}
            style={{
              ...styles.faqItem,
              ...(activeIndex === index ? styles.faqItemActive : {})
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              backgroundColor: activeIndex === index ? '#444444' : '#3a3a3a'
            }}
          >
            <div 
              style={{
                ...styles.faqQuestion,
                ...(activeIndex === index ? styles.faqQuestionActive : {})
              }}
              onClick={() => toggleAnswer(index)}
            >
              <strong>{item.question}</strong>
              <span 
                style={{
                  ...styles.faqIcon,
                  ...(activeIndex === index ? {} : styles.faqIconClosed)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 0 1 0-2h6V2a1 1 0 0 1 1-1z"
                  />
                </svg>
              </span>
            </div>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p style={styles.faqAnswer}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}

export default FAQ;