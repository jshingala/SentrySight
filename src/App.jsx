import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import "./global.css";
import "./App.css";

// Lazy load other pages
const ContactUs = lazy(() => import("./ContactUs"));
const AboutUs = lazy(() => import("./AboutUs"));
const Demo = lazy(() => import("./Demo"));
const Questionnaire = lazy(() => import("./Questionnaire"));
const Pricing = lazy(() => import("./Pricing"));
const FAQ = lazy(() => import("./FAQ"));
const Login = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));
const Profile = lazy(() => import("./Profile"));
const NotFound = lazy(() => import("./404"));


import Header from "./Header.jsx";
import Contact from "./Contact.jsx";
import ContactUs from './ContactUs'; 
import AboutUs from "./AboutUs.jsx";
import Hero from "./Hero.jsx";
import FAQ from "./FAQ.jsx";
import Blog from "./Blog.jsx";
import Features from "./Features.jsx";
import News from "./News.jsx";
import Socials from "./Socials.jsx";
import Testimonials from "./Testimonials.jsx";
import Questionnaire from "./Questionnaire.jsx";
import Demo from "./Demo.jsx";
import Login from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import Pricing from './Pricing.jsx';
import CTA from "./CTA.jsx";
import Footer from "./Footer.jsx";
import Profile from "./Profile.jsx";
import NotFound from "./404.jsx"; 
import Admin from "./Admin.jsx";
import "./CSS.css";
import "./App.css"; 

function AppContent({ userEmail, setUserEmail }) {
  const location = useLocation();

  return (
    <div className="App">
      <Header userEmail={userEmail} />

      <div className="content-wrapper">
        <main className="main-content">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
                
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
                    <ContactUs />
                    <Socials />
                  </>
                }
              />

              <Route path="/about" element={<AboutUs />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/questionnaire" element={<Questionnaire userEmail={userEmail} />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/sign-in" element={<Login setUserEmail={setUserEmail} />} />
              <Route path="/sign-up" element={<SignUp />} />

              <Route path="/profile" element={<Profile userEmail={userEmail} setUserEmail={setUserEmail} />} />
              <Route path="*" element={<NotFound />} />

              <Route
                path="/profile"
                element={<Profile userEmail={userEmail} setUserEmail={setUserEmail} />}
              />
              <Route path="/admin" element={<Admin />} />

              <Route path="*" element={<NotFound />} /> {/* Rout to 404 Page */}

            </Routes>
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || "");

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