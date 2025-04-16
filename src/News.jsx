import React, { useEffect, useState } from "react";
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
        setLoading(false); // Stop loading even if there's no data
      }
    };
    getNews();
  }, []);

  return (
    <section className="news-section">
      <div className="container">
        <h2 className="news-title">Latest News</h2>
        {loading ? (
          <p>Loading news...</p>
        ) : news.length > 0 ? (
          <ul className="news-list">
            {news.map((article) => (
              <li key={article.id} className="news-item">{article.title}</li>
            ))}
          </ul>
        ) : (
          <p>No news available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default News;
