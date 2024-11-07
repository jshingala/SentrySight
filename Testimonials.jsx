import React from "react";
import './testimonials.css'; // Import the CSS file

function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      text: "Sentry Sight has transformed our security approach!",
    },
    {
      name: "Jane Smith",
      text: "Incredibly easy to use and effective!",
    },
    {
      name: "Bob Johnson",
      text: "Highly recommend this service to everyone!",
    },
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
