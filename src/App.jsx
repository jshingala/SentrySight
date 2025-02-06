import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
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
import Demo from "./Demo.jsx";
import Login from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import Pricing from './Pricing.jsx';
import CTA from "./CTA.jsx";
import Footer from "./Footer.jsx";
import Profile from "./Profile.jsx";
import "./CSS.css";
import "./App.css"; // Ensure the CSS for transitions is included

function AppContent({ userEmail, setUserEmail }) {
  const location = useLocation();

  return (
    <div className="App">
      <Header userEmail={userEmail} />
      <main className="main-content">
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Routes location={location}>
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
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route
                path="/sign-in"
                element={<Login setUserEmail={setUserEmail} />}
              />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/profile"
                element={<Profile userEmail={userEmail} setUserEmail={setUserEmail} />}
              />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "";
  });

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    }
  }, [userEmail]);

  return (
    <Router>
      <AppContent userEmail={userEmail} setUserEmail={setUserEmail} />
    </Router>
  );
}

export default App;
