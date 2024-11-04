import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import FAQ from './FAQ.jsx';
import Blog from './Blog.jsx';
import Features from './Features.jsx';
import News from './News.jsx';
import Socials from './Socials.jsx';
import Contact from './Contact.jsx'; // Import the Contact component
import Testimonials from './Testimonials.jsx'; // Import the Testimonials component
import Questionnaire from './Questionnaire.jsx';
import './CSS.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/" element={
              <>
                <section className="banner">
                  <h2>Your Banner Title</h2>
                  <p>This is a sample tagline. Customize it as you wish.</p>
                </section>
                <section className="banner2">
                  <h2>Insert picture</h2>
                </section>
                <section className="features">
                  <h2>Features Section</h2>
                  <p>Highlight some key features here.</p>
                </section>
                <section className="features">
                  <p>Highlight some key features here.</p>
                  <h2>Features Section</h2>
                </section>
                <section className="cta">
                  <h2>Call to Action</h2>
                  <p>Encourage users to take action here.</p>
                </section>
                <section className="banner">
                  <h2>Title</h2>
                  <p>Description.</p>
                  <div className="divider"></div>
                </section>
                <Features />
                <News />
                <Testimonials /> {/* Add the Testimonials component */}
                <Contact /> {/* Add the Contact component */}
                <Socials />
              </>
            } />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; SentrySight. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
