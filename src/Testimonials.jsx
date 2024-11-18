import React from "react";
import './testimonials.css'; // Import the CSS file

function Testimonials() {
  const testimonials = [
    {
      name: "Michael Lee",
      text: "SentrySight's real-time threat detection has given us peace of mind. Our team feels much safer knowing the system is in place."
    },
    {
      name: "Sarah K.",
      text: "The firearm detection feature is incredibly accurate. We've been able to respond faster and avoid potential incidents."
    },
    {
      name: "James O’Neil",
      text: "Integrating SentrySight into our security infrastructure was seamless. Highly recommend for any organization prioritizing safety."
    },
    {
      name: "Emily Tran",
      text: "SentrySight has revolutionized our approach to security monitoring. The 24/7 alerts ensure we're always informed, even off-site."
    },
    {
      name: "Carlos Diaz",
      text: "The user-friendly interface made training our staff a breeze. SentrySight is truly a game-changer in security tech."
    }
  ];

  return (
    <section className="testimonials">
      <h2 className="testimonials-title">What Our Clients Say</h2>
      <div className="testimonials-list">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-name">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
