import React, { useEffect, useState } from "react";
import { fetchWithCache } from "./apiService";

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
    <section style={{ padding: "60px 0" }}>
      <div className="container">
        <h2 className="text-center" style={{ marginBottom: "30px", fontSize: "2rem" }}>Latest News</h2>
        {loading ? (
          <p className="text-center text-light">Loading news...</p>
        ) : news.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {news.map((article) => (
              <li 
                key={article.id} 
                className="card" 
                style={{ 
                  marginBottom: "20px",
                  display: "block"
                }}
              >
                {article.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-light">No news available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default News;