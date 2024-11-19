import React, { useState, useEffect } from 'react';
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
import Register from './SignUp.jsx';  // Changed to SignUp to match the component name
import CTA from './CTA.jsx';
import Footer from './Footer.jsx';
import Pricing from './Pricing.jsx';
import Profile from './Profile.jsx';
import './CSS.css';

function App() {
  const [userEmail, setUserEmail] = useState(() => {
    // Check if there's a stored user email in localStorage
    return localStorage.getItem('userEmail') || '';
  });

  // Update localStorage whenever userEmail changes
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    }
  }, [userEmail]);

  return (
    <Router>
      <div className="App">
        <Header userEmail={userEmail} /> {/* Pass userEmail to Header */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={ 
              <>
                <Hero />
                <Features />
                <News />
                <Testimonials />
                <CTA />
                <Contact />
                <Socials />
              </>
            } />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/sign-in" element={<Login setUserEmail={setUserEmail} />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/profile" element={<Profile userEmail={userEmail} setUserEmail={setUserEmail}/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
