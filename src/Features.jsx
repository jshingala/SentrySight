import React from "react";
import './features.css'; // Import the CSS file

function Features() {
  const featureList = [
    { title: "Feature 1", description: "Description for feature 1." },
    { title: "Feature 2", description: "Description for feature 2." },
    { title: "Feature 3", description: "Description for feature 3." },
    { title: "Feature 4", description: "Description for feature 4." },

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
