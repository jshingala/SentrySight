import React, { useState } from "react";
import './AboutUs.css'; 
import { motion } from 'framer-motion';

function AboutUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (imageSrc) => { // open modal with selected image
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => { // close modal and reset image
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <motion.div
      className="about-us"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        About SentrySight
      </motion.h2>
      
      <motion.p
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        At SentrySight, we believe in the power of technology to create safer spaces for everyone. We believe that creating secure environments should not be reactive, but proactive, and that's where innovation steps in. By merging artificial intelligence with real-time detection systems, we bring the future of security to the present. Our state-of-the-art solutions are thoughtfully designed to meet the unique needs of businesses, educational institutions, and community spaces, ensuring not only protection but also peace of mind. Whether it's identifying potential threats before they escalate or enhancing situational awareness, SentrySight empowers organizations to stay one step ahead. With a strong focus on precision, adaptability, and user-friendly interfaces, we are not just keeping up with the future of security—we're shaping it.
      </motion.p>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Our Mission
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Our mission is to make security accessible, intelligent, and effortless for everyone. We are dedicated to developing AI-driven technologies that help detect potential risks early and effectively, reducing response time and enhancing overall safety. Our goal is to transform traditional security methods by harnessing the power of automation, machine learning, and advanced analytics, enabling faster and more informed decision-making. By reducing response time and minimizing human error, our systems enhance overall safety while remaining intuitive and easy to use. Whether it's safeguarding schools, streamlining business operations, or strengthening community protection, we are driven by the belief that smarter technology leads to safer spaces for all.
      </motion.p>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        What We Offer
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        From AI-powered detection systems that monitor spaces in real-time to customizable alerts and analytics, our products are designed with user needs in mind. Sentry Sight provides solutions that fit seamlessly into daily operations, adding an extra layer of security without the complexity. Whether it's identifying potential threats, streamlining emergency response, or offering data-driven insights for long-term planning, our technology provides an intelligent, proactive layer of protection. With flexibility, scalability, and simplicity at the core, SentrySight empowers organizations to safeguard their environments with confidence and ease.
      </motion.p>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        Meet Our Team
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        Our team is composed of engineers, data scientists, and innovators driven by a commitment to safety and progress. With diverse expertise spanning artificial intelligence, cybersecurity, software development, and community safety, we bring a well-rounded approach to every solution we design. Each member contributes a unique perspective, allowing us to create systems that are not only technically robust but also practical and responsive to real-world needs. At SentrySight, collaboration and innovation go hand in hand as we work toward building safer, smarter environments for everyone.
      </motion.p>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        Join Us in Making a Safer Tomorrow
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        Whether you're aiming to secure your business, protect a community space, or explore the potential of next generation safety technology, we invite you to connect with us. At SentrySight, we believe that safety is a shared responsibility and innovation is most powerful when it's accessible to all. By partnering with forward thinking individuals and organizations, we're building a future where smart, proactive security is the norm, not the exception. Let's work together to create safer, more resilient environments for everyone.
      </motion.p>

      <div className="awards-section">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          Awards & Recognition
        </motion.h2>
        
        <div className="awards-gallery">
          <div className="awards-row">
            <div className="award-item" onClick={() => openModal("/src/assets/pic1.jpg")}>
              <img src="/src/assets/pic1.jpg" alt="Award 1" />
              <div className="award-caption">1st Place AI Hackathon</div>
            </div>
            <div className="award-item" onClick={() => openModal("/src/assets/pic2.jpg")}>
              <img src="/src/assets/pic2.jpg" alt="Award 2" />
              <div className="award-caption">Second Place University Pitch Comp</div>
            </div>
          </div>
          <div className="award-item" onClick={() => openModal("/src/assets/pic3.jpg")}>
            <img src="/src/assets/pic3.jpg" alt="Award 3" />
            <div className="award-caption">2nd Place Statewide Competition</div>
          </div>
        </div>
      </div>

      {isModalOpen && (
  <div className="modal-overlay" data-testid="modal-overlay" onClick={closeModal}>
    <div className="modal-content">
      <img src={modalImage} alt="Full Screen Award" className="modal-image" />
    </div>
  </div>
)}
    </motion.div>
  );
}

export default AboutUs;

