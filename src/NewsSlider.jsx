import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './newsSlider.css';

const NewsSlider = () => {
  const [news, setNews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Mock news data
    const mockNews = [
      {
        id: 1,
        title: "SentrySight Launches New AI Weapon Detection",
        summary: "The latest AI-powered upgrade can detect firearms in real-time with over 95% accuracy.",
        link: "#"
      },
      {
        id: 2,
        title: "School District Adopts SentrySight",
        summary: "A major California school district has integrated SentrySight for on-campus threat monitoring.",
        link: "#"
      },
      {
        id: 3,
        title: "Citywide Surveillance Goes Smart",
        summary: "City officials partner with SentrySight to deploy AI threat detection across public spaces.",
        link: "#"
      },
      {
        id: 4,
        title: "SentrySight Now Integrates with Ring & Nest",
        summary: "Users can now connect SentrySight's detection to smart home systems like Ring and Nest.",
        link: "#"
      },
      {
        id: 5,
        title: "Case Study: Threat Neutralized in Seconds",
        summary: "SentrySight helped private security identify and respond to a firearm threat in under 15 seconds.",
        link: "#"
      }
    ];

    setNews(mockNews);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <section className="news-slider-section">
      <div className="container">
        <h2 className="section-title">Latest News</h2>

        {news.length > 0 ? (
          <div className="slider-container">
            {news.map((article, index) => (
              <motion.div
                key={article.id}
                className={`slider-item ${index === current ? "active" : "inactive"}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: index === current ? 1 : 0, scale: index === current ? 1 : 0.9 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="news-headline">{article.title}</h3>
                <p className="news-summary">{article.summary}</p>
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn">
                Read More
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="no-news-message">No news available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default NewsSlider;