import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchWithCache } from "./apiService";
import "./homepage.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const data = await fetchWithCache("https://api.example.com/news");
      if (data) {
        setNews(data);
        setLoading(false);
      } else {
        // Fallback to static content if API fails
        setNews([
          {
            id: 1,
            title: "SentrySight Launches Advanced AI Detection System",
            date: "2024-03-15",
            excerpt: "Our latest AI-powered security system achieves 99.9% accuracy in threat detection during real-world trials."
          },
          {
            id: 2,
            title: "New Partnership Announcement",
            date: "2024-03-10",
            excerpt: "SentrySight partners with leading security firms to enhance protection capabilities across North America."
          },
          {
            id: 3,
            title: "Security Innovation Award 2024",
            date: "2024-03-05",
            excerpt: "SentrySight recognized for breakthrough advancements in AI-driven security solutions."
          }
        ]);
        setLoading(false);
      }
    };
    getNews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="news-section">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Latest News & Updates
      </motion.h2>
      {loading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Loading news...
        </motion.p>
      ) : news.length > 0 ? (
        <motion.div
          className="news-list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {news.map((article) => (
            <motion.div
              key={article.id}
              className="news-item"
              variants={itemVariants}
            >
              <span className="news-date">{article.date}</span>
              <h3 className="news-title">{article.title}</h3>
              <p className="news-excerpt">{article.excerpt}</p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          No news available at the moment.
        </motion.p>
      )}
    </section>
  );
};

export default News;

