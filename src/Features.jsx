import React from "react";
import './features.css'; // Import the CSS file

function Features() {
  const featureList = [
    { 
      title: "Real-Time Threat Detection", 
      description: "Uses AI-powered technology to detect potential threats instantly, ensuring the highest level of security for your premises." 
    },
    { 
      title: "Advanced Firearm Detection", 
      description: "Identifies firearms in real-time using machine learning algorithms, allowing for quick alerts and faster response times." 
    },
    { 
      title: "Seamless Integration with Security Systems", 
      description: "Easily integrates with existing security infrastructure, providing a unified and efficient monitoring experience." 
    },
    { 
      title: "24/7 Monitoring and Alerts", 
      description: "Provides continuous monitoring and instant alerts to keep you informed of any unusual activity, day or night." 
    },
    { 
      title: "Cloud-Based Data Management", 
      description: "Utilizes cloud storage to securely manage and analyze data, making it accessible from anywhere and ensuring reliability." 
    },
    { 
      title: "User-Friendly Interface", 
      description: "Designed with a simple and intuitive interface, allowing users to manage and configure settings easily." 
    }
  ];

  return (
    <section className="features">
      <h2 className="features-title">Key Features</h2>
      <div className="features-grid">
        {featureList.map((feature, index) => (
          <div key={index} className="feature-item">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
