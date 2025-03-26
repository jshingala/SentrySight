// Features.jsx
import React, { useState } from "react";
import './features.css';
import { BiBell, BiCloud, BiDesktop, BiLinkAlt, BiShield, BiVideo } from 'react-icons/bi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Features() {
  const [activeIndex, setActiveIndex] = useState(0); // Start with the first card active

  const featureList = [
    { 
      title: "24/7 Monitoring and Alerts", 
      description: "Provides continuous monitoring and instant alerts to keep you informed of any unusual activity, day or night.",
      icon: <BiBell className="feature-icon" />
    },
    { 
      title: "Cloud-Based Data Management", 
      description: "Utilizes cloud storage to securely manage and analyze data, making it accessible from anywhere and ensuring reliability.",
      icon: <BiCloud className="feature-icon" />
    },
    { 
      title: "User-Friendly Interface", 
      description: "Designed with a simple and intuitive interface, allowing users to manage and configure settings easily.",
      icon: <BiDesktop className="feature-icon" />
    },
    { 
      title: "Real-Time Threat Detection", 
      description: "Uses AI-powered technology to detect potential threats instantly, ensuring the highest level of security for your premises.",
      icon: <BiShield className="feature-icon" />
    },
    { 
      title: "Advanced Firearm Detection", 
      description: "Identifies firearms in real-time using machine learning algorithms, allowing for quick alerts and faster response times.",
      icon: <BiVideo className="feature-icon" />
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === featureList.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? featureList.length - 1 : prevIndex - 1));
  };

  return (
    <section className="features">
      <h2 className="features-title">Key Features</h2>
      <div className="carousel-container">
        <button className="nav-arrow nav-arrow-left" onClick={prevSlide}>
          <IoIosArrowBack />
        </button>
        
        <div className="card-container">
          {featureList.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${index === activeIndex ? 'active' : ''}`}
              style={{
                display: Math.abs(index - activeIndex) <= 1 ? 'flex' : 'none',
                transform: `translateX(${(index - activeIndex) * 100}%)`,
                zIndex: index === activeIndex ? 2 : 1,
                opacity: index === activeIndex ? 1 : 0.7
              }}
            >
              <div className="icon-circle">
                {feature.icon}
              </div>
              <h3 className="card-title">{feature.title}</h3>
              <div className="title-underline"></div>
              <p className="card-description">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <button className="nav-arrow nav-arrow-right" onClick={nextSlide}>
          <IoIosArrowForward />
        </button>
      </div>
      
      <div className="dot-indicators">
        {featureList.map((_, index) => (
          <span 
            key={index} 
            className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;