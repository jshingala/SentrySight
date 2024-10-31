import React from "react";
import './CSS.css';

function News() {
  return (
    <section className="news-section">
      <h2>Join the newsletter!</h2>
      <p>Join to get the lastest news of our product</p>
      <div className="news-form">
        <input type="email" placeholder="Your Email Address" />
        <button>Get started</button>
      </div>
    </section>
  );
}

export default News;