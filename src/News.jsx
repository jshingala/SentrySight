import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import './news.css';

function News() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const newsItems = [
    {
      title: "Top 9 in NASA MINDS Competition",
      date: "April 2025",
      description: "SentrySight was recognized in the NASA MINDS innovation competition, placing in the top 9 teams nationally for our AI-driven security technology.",
      image: "/src/assets/news-nasa.jpg"
    },
    {
      title: "5th Place in eFest 2025 Schulze Challenge",
      date: "March 2025",
      description: "Our team secured 5th place at the prestigious eFest 2025 Schulze Entrepreneur Challenge, competing against innovative startups from across the country.",
      image: "/src/assets/news-efest.jpg"
    },
    {
      title: "2nd Place in SunStone CSU Startup Launch",
      date: "February 2025",
      description: "SentrySight earned 2nd place in the SunStone CSU Startup Launch competition, receiving funding and mentorship to accelerate our growth.",
      image: "/src/assets/pic3.jpg"
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="news-section">
      <div className="container">
        <h2 className="section-title">Latest Achievements</h2>
        <div className="red-divider"></div>
        
        <div className="news-carousel-container">
          <button className="news-nav news-nav-left" onClick={prevSlide}>
            <BiChevronLeft />
          </button>
          
          <div className="news-carousel">
            {newsItems.map((news, index) => (
              <div 
                key={index} 
                className={`news-card ${index === activeIndex ? 'active' : ''}`}
                style={{
                  transform: `translateX(${(index - activeIndex) * 100}%)`,
                  opacity: index === activeIndex ? 1 : 0
                }}
              >
                <div className="news-image">
                  <img src={news.image} alt={news.title} />
                </div>
                <div className="news-content">
                  <span className="news-date">{news.date}</span>
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-description">{news.description}</p>
                  <a href="#" className="news-link">Read More</a>
                </div>
              </div>
            ))}
          </div>
          
          <button className="news-nav news-nav-right" onClick={nextSlide}>
            <BiChevronRight />
          </button>
        </div>
        
        <div className="news-indicators">
          {newsItems.map((_, index) => (
            <span 
              key={index} 
              className={`news-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default News;