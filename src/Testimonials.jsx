import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import './testimonials.css';

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Your original testimonial content
  const testimonials = [
    {
      name: "Michael Lee",
      company: "Secure Solutions Inc",
      text: "SentrySight's real-time threat detection has given us peace of mind. Our team feels much safer knowing the system is in place."
    },
    {
      name: "Sarah K.",
      company: "Metro Security Group",
      text: "The firearm detection feature is incredibly accurate. We've been able to respond faster and avoid potential incidents."
    },
    {
      name: "James O'Neil",
      company: "Citywide Protection",
      text: "Integrating SentrySight into our security infrastructure was seamless. Highly recommend for any organization prioritizing safety."
    },
    {
      name: "Emily Tran",
      company: "Guardian Services",
      text: "SentrySight has revolutionized our approach to security monitoring. The 24/7 alerts ensure we're always informed, even off-site."
    },
    {
      name: "Carlos Diaz",
      company: "Safeguard Technologies",
      text: "The user-friendly interface made training our staff a breeze. SentrySight is truly a game-changer in security tech."
    }, 
    {
      name: "Bilal Patel",
      company: "ABS Security",
      text: "Making SentrySight a part of our system was a very easy and fluid process. We have been able to integrate into our functionalities very effectively."
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        
        <div className="testimonials-carousel">
          <button className="nav-button prev-button" onClick={prevTestimonial}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="profile-section">
                <div className="profile-image-container">
                  <div className="profile-placeholder">
                    {testimonials[currentIndex].name
                      .split(' ')
                      .map(name => name[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                </div>
                <h3 className="profile-name">{testimonials[currentIndex].name.toUpperCase()}</h3>
                <p className="profile-company">{testimonials[currentIndex].company}</p>
              </div>
              
              <div className="quote-section">
                <div className="quote-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
                  </svg>
                </div>
                <p className="quote-text">"{testimonials[currentIndex].text}"</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="nav-button next-button" onClick={nextTestimonial}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

