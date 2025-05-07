// Features.jsx
import React from "react";
import './features.css';
import { BiBell, BiCloud, BiDesktop, BiShield, BiVideo, BiLockAlt } from 'react-icons/bi';

function Features() {
  const featureList = [
    { 
      title: "Real-Time Alerts", 
      description: "Instant notifications to law enforcement ensure timely intervention and minimize risks.",
      icon: <BiBell className="feature-icon" />
    },
    { 
      title: "Advanced AI Technology", 
      description: "Our system uses state-of-the-art AI to identify threats with high accuracy.",
      icon: <BiCloud className="feature-icon" />
    },
    { 
      title: "Easy Integration", 
      description: "Seamlessly integrates with your existing security cameras and systems.",
      icon: <BiLockAlt className="feature-icon" />
    },
    { 
      title: "Rapid Response", 
      description: "Immediate alerts enable quick action to prevent potential incidents.",
      icon: <BiShield className="feature-icon" />
    },
    { 
      title: "24/7 Monitoring", 
      description: "Continuous surveillance ensures constant protection for your premises.",
      icon: <BiVideo className="feature-icon" />
    },
    { 
      title: "Scalable Solution", 
      description: "Easily expand coverage as your security needs grow and evolve.",
      icon: <BiDesktop className="feature-icon" />
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Why Choose Our AI Solution?</h2>
        <p className="section-subtitle">Prevent incidents, save lives, and protect your business with the latest AI technology.</p>
        
        <div className="red-divider"></div>
        
        <div className="features-grid">
          {featureList.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon-circle">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;