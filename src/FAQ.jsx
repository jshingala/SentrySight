// FAQ.jsx
import React, { useState } from "react";
import "./FAQ.css";

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
      answer: "Absolutely! Sentry Sight offers extensive customization options to ensure the system works exactly as you need it to. You can define dpecific monitoring zones, set up notification preferences, and create unique security protocals for different scenarios. Our intuative interface makes it easy to modify these settings at any time, and our support team is always available to help you optimize your configuration.",
    },
    {
      question: "What devices are compatible?",
      answer:
        "Our solution is compatible with most modern devices, including smartphones, tablets, and desktops. The Sentry Sight mobile app is avaible for both iOS ans Android smartphones and tabletys, with full functionality on the latest versions. For desktop users, we offer a web-based dashboard that works on all major browsers including Cgrome, Firefox, Safari, and Edge.",
    },
    {
      question: "Is there a trial version?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all features. during this period, you can test our advanced AI detection capabilities, mobile app functionality, and customization options without any commitment. After the trial period, you can choose from our different subscription plans to pick the best that suits your needs.",
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