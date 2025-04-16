import { motion } from "framer-motion";
import React from "react";
import './homepage.css';

function Testimonials() {
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
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="profile-section">
                <div className="profile-image-container">
                  {/* Generate colored initials for profile placeholder */}
                  <div className="profile-placeholder">
                    {testimonial.name
                      .split(' ')
                      .map(name => name[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                </div>
                <h3 className="profile-name">{testimonial.name.toUpperCase()}</h3>
                <p className="profile-company">{testimonial.company}</p>
              </div>
              
              <div className="quote-section">
                <div className="quote-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
                  </svg>
                </div>
                <p className="quote-text">"{testimonial.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;