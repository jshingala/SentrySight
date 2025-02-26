// FAQ.jsx
import React, { useState } from "react";
import "./FAQ.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is Sentry Sight?",
      answer:
        "Sentry Sight is a cutting-edge security solution designed to help you monitor and protect your property using advanced AI-powered surveillance technology. Our platform combines real-time monitoring, intelligent threat detection, and instant notifications to provide comprehensive security coverage for your home or business. With Sentry Sight, you can have peace of mind knowing your property is protected 24/7.",
    },
    {
      question: "How does it work?",
      answer:
        "Our system utilizes state-of-the-art cameras and sensors connected to our powerful AI analytics engine to monitor your property in real-time. When unusual activity is detected, our AI analyzes the situation using advanced computer vision algorithms to determine potential threats. If a security concern is identified, you'll receive immediate notifications through our mobile app, and if enabled, our system can automatically alert local authorities. The entire process happens within seconds, ensuring rapid response to any security incidents.",
    },
    {
      question: "Can I customize my settings?",
      answer: 
        "Absolutely! Sentry Sight offers extensive customization options to ensure the system works exactly as you need it to. You can define specific monitoring zones, adjust sensitivity levels for different times of day, set up custom notification preferences, and create unique security protocols for different scenarios. Our intuitive interface makes it easy to modify these settings at any time, and our support team is always available to help you optimize your configuration.",
    },
    {
      question: "What devices are compatible?",
      answer:
        "Our solution is designed to work seamlessly across a wide range of devices and platforms. The Sentry Sight mobile app is available for both iOS and Android smartphones and tablets, with full functionality on the latest versions. For desktop users, we offer a web-based dashboard that works on all major browsers including Chrome, Firefox, Safari, and Edge. Additionally, our security cameras and sensors are compatible with most modern smart home systems and can integrate with popular platforms like Google Home and Amazon Alexa.",
    },
    {
      question: "Is there a trial version?",
      answer:
        "Yes, we offer a comprehensive 14-day free trial that gives you full access to all premium features of Sentry Sight. During this period, you can test our advanced AI detection capabilities, mobile app functionality, and customization options without any commitment. The trial includes access to our 24/7 customer support team who can help you set up the system and answer any questions you may have. After the trial period, you can choose from our flexible subscription plans that best suit your needs.",
    },
  ];

  const toggleAnswer = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      <ul>
        {questions.map((item, index) => (
          <li
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <strong>{item.question}</strong>
              <span className="faq-icon">
                {/* SVG for plus icon */}
                {activeIndex === index ? (
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
                ) : (
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
                )}
              </span>
            </div>
            {activeIndex === index && (
              <p className="faq-answer">{item.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FAQ;