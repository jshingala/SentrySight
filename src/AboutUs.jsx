import { motion } from 'framer-motion';
import React, { useState } from "react";
import './global.css';

function AboutUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  // Custom styles using global.css variables and classes
  const styles = {
    aboutContainer: {
      padding: '60px',
      maxWidth: '1100px',
      margin: '50px auto',
      borderRadius: '15px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
    },
    sectionHeading: {
      fontSize: '2.5rem',
      margin: '0 0 25px 0',
      backgroundImage: 'linear-gradient(to right, #8a89e6, #d084f3)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
    },
    subHeading: {
      fontSize: '1.8rem',
      color: '#d084f3',
      marginBottom: '12px',
      textTransform: 'uppercase',
      borderBottom: '2px solid #d084f3',
      paddingBottom: '8px',
    },
    paragraph: {
      fontSize: '1.1rem',
      color: '#bfbfbf',
      textAlign: 'justify',
      marginBottom: '25px',
    },
    awardsSection: {
      marginTop: '60px',
      textAlign: 'center',
    },
    awardsGallery: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '25px',
      justifyContent: 'center',
    },
    awardItem: {
      textAlign: 'center',
      cursor: 'pointer',
    },
    awardImage: {
      width: '100%',
      maxWidth: '270px',
      borderRadius: '12px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    awardCaption: {
      fontSize: '1rem',
      color: '#d084f3',
      marginTop: '10px',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '90%',
      maxHeight: '90%',
    },
    modalImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(255, 255, 255, 0.3)',
    },
  };

  return (
    <motion.div
      className="card"
      style={styles.aboutContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        style={styles.sectionHeading}
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        About SentrySight
      </motion.h2>
      
      <motion.p
        style={styles.paragraph}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        At SentrySight, we believe in the power of technology to create safer spaces for everyone. By merging artificial intelligence with real-time detection systems, we bring the future of security to the present. Our solutions are crafted for businesses, schools, and communities seeking to proactively protect their spaces with precision and innovation.
      </motion.p>

      <motion.h3
        style={styles.subHeading}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Our Mission
      </motion.h3>

      <motion.p
        style={styles.paragraph}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Our mission is to make security accessible, intelligent, and effortless for everyone. We are dedicated to developing AI-driven technologies that help detect potential risks early and effectively, reducing response time and enhancing overall safety.
      </motion.p>

      <motion.h3
        style={styles.subHeading}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        What We Offer
      </motion.h3>

      <motion.p
        style={styles.paragraph}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        From AI-powered detection systems that monitor spaces in real-time to customizable alerts and analytics, our products are designed with user needs in mind. Sentry Sight provides solutions that fit seamlessly into daily operations, adding an extra layer of security without the complexity.
      </motion.p>

      <motion.h3
        style={styles.subHeading}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        Meet Our Team
      </motion.h3>

      <motion.p
        style={styles.paragraph}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        Our team is composed of engineers, data scientists, and innovators driven by a commitment to safety and progress. With a collective background in AI, cybersecurity, and community safety, we bring a diverse skill set to every solution we create.
      </motion.p>

      <motion.h3
        style={styles.subHeading}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        Join Us in Making a Safer Tomorrow
      </motion.h3>

      <motion.p
        style={styles.paragraph}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        Whether you're looking to secure your business or simply want to learn more about the future of safety technology, we welcome you to connect with us. Together, we can create safer environments for all.
      </motion.p>

      <div style={styles.awardsSection}>
        <motion.h2
          style={styles.sectionHeading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          Awards & Recognition
        </motion.h2>
        
        <div style={styles.awardsGallery}>
          <div style={styles.awardItem} onClick={() => openModal("/src/assets/pic1.jpg")}>
            <img 
              src="/src/assets/pic1.jpg" 
              alt="Award 1" 
              style={styles.awardImage}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
              }}
            />
            <div style={styles.awardCaption}>1st Place AI Hackathon</div>
          </div>
          <div style={styles.awardItem} onClick={() => openModal("/src/assets/pic2.jpg")}>
            <img 
              src="/src/assets/pic2.jpg" 
              alt="Award 2" 
              style={styles.awardImage}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
              }}
            />
            <div style={styles.awardCaption}>Second Place University Pitch Comp</div>
          </div>
          <div style={styles.awardItem} onClick={() => openModal("/src/assets/pic3.jpg")}>
            <img 
              src="/src/assets/pic3.jpg" 
              alt="Award 3" 
              style={styles.awardImage}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
              }}
            />
            <div style={styles.awardCaption}>2nd Place Statewide Competition</div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent}>
            <img 
              src={modalImage} 
              alt="Full Screen Award" 
              style={styles.modalImage}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default AboutUs;