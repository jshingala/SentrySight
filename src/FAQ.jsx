// FAQ.jsx
import React, { useState } from "react";
import "./FAQ.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is Sentry Sight?",
      answer:
        "Sentry Sight is a security solution designed to help you stay safe.",
    },
    {
      question: "How does it work?",
      answer:
        "Our system utilizes advanced technology to monitor and protect you.",
    },
    {
      question: "Can I customize my settings?",
      answer: "Yes! You can tailor the settings to your specific needs.",
    },
    {
      question: "What devices are compatible?",
      answer:
        "Our solution is compatible with most modern devices, including smartphones, tablets, and desktops.",
    },
    {
      question: "Is there a trial version?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all features.",
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