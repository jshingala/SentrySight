import React from "react";
import './news.css'; // Import the CSS file

function News() {
  const newsList = [
    { title: "News Item 1", description: "Details about news item 1." },
    { title: "News Item 2", description: "Details about news item 2." },
    { title: "News Item 3", description: "Details about news item 3." },
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
