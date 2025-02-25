
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Header.jsx";
import AboutUs from "./AboutUs.jsx";
import Hero from "./Hero.jsx";
import FAQ from "./FAQ.jsx";
import Blog from "./Blog.jsx";
import Features from "./Features.jsx";
import News from "./News.jsx";
import Socials from "./Socials.jsx";
import Contact from "./Contact.jsx";
import Testimonials from "./Testimonials.jsx";
import Questionnaire from "./Questionnaire.jsx";
import Questionnaire_Admin from "./Questionnaire_Admin.jsx";
import Demo from "./Demo.jsx";
import Login from "./SignIn.jsx";
import SignUp from "./SignUp.jsx"; // Changed to SignUp to match the component name
import Pricing from './Pricing.jsx'; // Add this import
import CTA from "./CTA.jsx";
import Footer from "./Footer.jsx";
import Profile from "./Profile.jsx";
import "./CSS.css";

function App() {
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "";
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") || false;
  });

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem("isAdmin", isAdmin);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    }
  }, [userEmail]);

  return (
    <Router>
      <div className="App">
        <Header userEmail={userEmail} isAdmin={isAdmin} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Features />
                  <News />
                  <Testimonials />
                  <CTA />
                  <Contact />
                  <Socials />
                </>
              }
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/questionnaire" element={<Questionnaire userEmail={userEmail} />} />
            <Route path="/questionnaire_A" element={<Questionnaire_Admin />} />
            <Route path="/pricing" element={<Pricing />} /> {/* Add this route */}
            <Route path="/faq" element={<FAQ />} />
            <Route
              path="/sign-in"
              element={<Login setUserEmail={setUserEmail} setIsAdmin={setIsAdmin}/>}
            />
            <Route path="/sign-up" element={<SignUp />} />
           <Route path="/profile" element={<Profile userEmail={userEmail} setUserEmail={setUserEmail} setIsAdmin={setIsAdmin}/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;