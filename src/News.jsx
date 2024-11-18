import React from "react";
import './news.css'; // Import the CSS file

function News() {
  const newsList = [
    { 
      title: "SentrySight Launches New AI-Powered Security Platform", 
      description: "We are excited to announce the launch of our latest AI-driven platform, designed to enhance security with real-time threat detection and advanced firearm recognition." 
    },
    { 
      title: "SentrySight Partners with Local Law Enforcement Agencies", 
      description: "In a groundbreaking partnership, SentrySight collaborates with law enforcement to improve response times and enhance public safety." 
    },
    { 
      title: "SentrySight Receives Innovation Award for Security Solutions", 
      description: "Our innovative technology was recognized at the Security Innovation Awards for its impact on modern security challenges." 
    },
  ];

  return (
    <section className="news">
      <h2 className="news-title">Latest News</h2>
      <div className="news-list">
        {newsList.map((news, index) => (
          <div key={index} className="news-item">
            <h3 className="news-item-title">{news.title}</h3>
            <p className="news-item-description">{news.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default News;
