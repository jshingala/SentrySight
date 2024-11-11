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
import Register from './SignUp.jsx';
import CTA from './CTA.jsx';
import Footer from './Footer.jsx';
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
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
