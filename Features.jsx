import React from "react";
import './CSS.css';

function Features() {
  const features = [
    { icon: "📈", title: "Very convenient", description: "Description" },
    { icon: "💬", title: "Very convenient", description: "Description." },
    { icon: "👍", title: "Very convenient", description: "Description" },
    { icon: "📄", title: "Very convenient", description: "Description." },
    { icon: "✈️", title: "Very convenient", description: "Description." },
    { icon: "🔒", title: "Very convenient", description: "Description." }
  ];

  return (
    <section className="features">
      {features.map((feature, index) => (
        <div className="feature-item" key={index}>
          <div className="icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Features;