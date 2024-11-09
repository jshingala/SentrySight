import React from 'react';
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import AboutUs from './AboutUs.jsx';
import Hero from './Hero.jsx';
import FAQ from './FAQ.jsx';
import Blog from './Blog.jsx';
import Features from './Features.jsx';
import News from './News.jsx';
import Socials from './Socials.jsx';
import Contact from './Contact.jsx';
import Testimonials from './Testimonials.jsx';
import Questionnaire from './Questionnaire.jsx';
import Demo from './Demo.jsx';
import Login from './SignIn.jsx';
import Register from './SignUp.jsx'
import './CSS.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={ 
              <>
                <Hero />
                <section className="intro">
                  <div className="container">
                    <h2>Welcome to SentrySight</h2>
                    <p>Your trusted solution for advanced security.</p>
                  </div>
                </section>

                <section className="features">
                  <div className="container">
                    <h2>Key Features</h2>
                    <div className="feature-cards">
                      <div className="feature-card">
                        <h3>Real-time Monitoring</h3>
                        <p>Monitor events as they happen, with real-time alerts.</p>
                      </div>
                      <div className="feature-card">
                        <h3>AI-powered Detection</h3>
                        <p>Leverage AI for smarter, faster decision-making.</p>
                      </div>
                      <div className="feature-card">
                        <h3>Easy Integration</h3>
                        <p>Seamlessly integrate with your existing systems.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="cta">
                  <div className="container">
                    <h2>Ready to Get Started?</h2>
                    <p>Take the first step towards smarter security solutions. Join us today!</p>
                    <div className="cta-buttons">
                      <a href="/sign-up" className="btn-primary">Sign Up</a>
                      <a href="/demo" className="btn-secondary">See Demo</a> {/* This button now links to /demo */}
                    </div>
                  </div>
                </section>

                <Features />
                <News />
                <Testimonials />
                <Contact />
                <Socials />
              </>
            } />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/demo" element={<Demo />} /> {/* Ensures the demo page is routed */}
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
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
