import React from 'react';
import './FAQ.css';

function FAQ() {
  const questions = [
    { question: "What is Sentry Sight?", answer: "Sentry Sight is a security solution designed to help you stay safe." },
    { question: "How does it work?", answer: "Our system utilizes advanced technology to monitor and protect you." },
    { question: "Can I customize my settings?", answer: "Yes! You can tailor the settings to your specific needs." },
  ];

  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      <ul>
        {questions.map((item, index) => (
          <li key={index}>
            <strong>{item.question}</strong>
            <p>{item.answer}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FAQ;
