import { motion } from "framer-motion";
import React from "react";

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

  // Function to generate random background colors for profile placeholders
  const getRandomColor = (name) => {
    // Use name to generate a consistent color
    const colors = ['#8a89e6', '#4CAF50', '#3f51b5', '#e65100', '#1504fc'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <section className="container">
      <div className="container" style={{ padding: "60px 0" }}>
        <h2 className="text-center" style={{ marginBottom: "40px" }}>What Our Clients Say</h2>
        
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px",
          width: "100%"
        }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ 
                padding: "30px", 
                display: "flex", 
                flexDirection: "column",
                height: "100%"
              }}
            >
              <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <div style={{ 
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: getRandomColor(testimonial.name),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px"
                }}>
                  {testimonial.name
                    .split(' ')
                    .map(name => name[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase()}
                </div>
                <h3 style={{ margin: "0 0 5px", fontSize: "18px", fontWeight: "bold" }}>
                  {testimonial.name.toUpperCase()}
                </h3>
                <p className="text-light" style={{ margin: "0", fontSize: "14px" }}>
                  {testimonial.company}
                </p>
              </div>
              
              <div style={{ flex: "1", position: "relative" }}>
                <div style={{ 
                  position: "absolute", 
                  top: "-10px",
                  left: "0",
                  opacity: "0.3"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
                  </svg>
                </div>
                <p className="text-light" style={{ 
                  fontStyle: "italic",
                  lineHeight: "1.6",
                  margin: "0",
                  paddingLeft: "15px"
                }}>
                  "{testimonial.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;