import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Contact from "./Contact.jsx";
import ContactUs from './ContactUs'; 
import AboutUs from "./AboutUs.jsx";
import Hero from "./Hero.jsx";
import FP from "./ForgotPassword.jsx";
import FAQ from "./FAQ.jsx";
import Features from "./Features.jsx";
import News from "./News.jsx";
import Socials from "./Socials.jsx";
import Testimonials from "./Testimonials.jsx";
import Questionnaire from "./Questionnaire.jsx";
import Questionnaire_Admin from "./Questionnaire_Admin.jsx";
import Questionnaire_Client from "./Questionnaire_Client.jsx";
import Demo from "./Demo.jsx";
import Login from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import Pricing from './Pricing.jsx';
import CTA from "./CTA.jsx";
import Footer from "./Footer.jsx";
import Profile from "./Profile.jsx";
import NotFound from "./404.jsx"; 
import Admin from "./Admin.jsx";

// Import the TranslationProvider
import { TranslationProvider } from "./context/TranslationContext";

import "./CSS.css";
import "./App.css"; 

function AppContent({ userEmail, setUserEmail, isAdmin, setIsAdmin, clientEmail, setClientEmail }) {
  const location = useLocation();

  return (
    <div className="App">
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="main-content" style={{ marginTop: "80px" }}>
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
              <Route path="/demo" element={<Demo userEmail={userEmail} />} />
              
              {/* Questionnaire routes */}
              <Route path="/questionnaire" element={<Questionnaire userEmail={userEmail} />} />
              <Route path="/questionnaire_A" element={<Questionnaire_Admin setClientEmail={setClientEmail} />} />
              <Route path="/questionnaire_C" element={<Questionnaire_Client clientEmail={clientEmail} />} />
              
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route
                path="/sign-in"
                element={<Login setUserEmail={setUserEmail} setIsAdmin={setIsAdmin} />}
              />
              <Route path="/sign-up" element={<SignUp />} />
              <Route 
                path="/profile" 
                element={<Profile userEmail={userEmail} setUserEmail={setUserEmail} setIsAdmin={setIsAdmin} />} 
              />
              <Route path="/admin" element={<Admin />} />
              <Route path="/FP" element={<FP />} />

              {/* Route to 404 Page */}
              <Route path="*" element={<NotFound />} />
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
  
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true" || false;
  });
  
  const [clientEmail, setClientEmail] = useState(() => {
    return localStorage.getItem("clientEmail") || "";
  });

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    } else {
      localStorage.removeItem("userEmail");
    }
    
    localStorage.setItem("isAdmin", isAdmin);
    
    if (clientEmail) {
      localStorage.setItem("clientEmail", clientEmail);
    } else {
      localStorage.removeItem("clientEmail");
    }
  }, [userEmail, isAdmin, clientEmail]);

  // Wrap <Router> in <TranslationProvider>
  return (
    <TranslationProvider>
      <Router>
        <AppContent 
          userEmail={userEmail} 
          setUserEmail={setUserEmail} 
          isAdmin={isAdmin} 
          setIsAdmin={setIsAdmin}
          clientEmail={clientEmail}
          setClientEmail={setClientEmail}
        />
      </Router>
    </TranslationProvider>
  );
}

export default App;