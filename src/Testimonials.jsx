import React, { useState } from "react";
import './testimonials.css';
import { motion, AnimatePresence } from "framer-motion";
import client1 from "./assets/clients/ritchiepic.jpg";
import client2 from "./assets/clients/gavinpic.jpg";
import client3 from "./assets/clients/huypic.jpg";
import client4 from "./assets/clients/enriquepic.jpg";

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Michael Lee",
      role: "Security Director",
      text: "SentrySight's real-time threat detection has given us peace of mind. Our team feels much safer knowing the system is in place.",
      image: client1
    },
    {
      name: "Sarah K.",
      role: "School Principal",
      text: "The firearm detection feature is incredibly accurate. We've been able to respond faster and avoid potential incidents.",
      image: client2
    },
    {
      name: "James O'Neil",
      role: "Corporate Safety Manager",
      text: "Integrating SentrySight into our security infrastructure was seamless. Highly recommend for any organization prioritizing safety.",
      image: client3
    },
    {
      name: "Emily Tran",
      role: "Operations Manager",
      text: "SentrySight has revolutionized our approach to security monitoring. The 24/7 alerts ensure we're always informed, even off-site.",
      image: client4
    },
  ];

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Clients Say</h2>
        
        <div className="testimonials-slider">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              className="testimonial-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="client-image-box">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="client-image"
                />
              </div>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-symbol">"</div>
                  <p className="testimonial-text">{testimonials[activeIndex].text}</p>
                  <div className="testimonial-author">
                    <div className="author-name">{testimonials[activeIndex].name}</div>
                    <div className="author-role">{testimonials[activeIndex].role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="testimonial-nav">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;