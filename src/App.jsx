import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import "./global.css";
import "./App.css";
import LoadingSpinner from './LoadingSpinner';  // Import the new spinner

// Lazy load other pages
const ContactUs = lazy(() => import("./ContactUs"));
const AboutUs = lazy(() => import("./AboutUs"));
const Demo = lazy(() => import("./Demo"));
const Questionnaire = lazy(() => import("./Questionnaire"));
const Questionnaire_Admin = lazy(() => import("./Questionnaire_Admin.jsx"));
const Questionnaire_Client = lazy(() => import("./Questionnaire_Client.jsx"));
const Pricing = lazy(() => import("./Pricing"));
const FAQ = lazy(() => import("./FAQ"));
const Login = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));
const Profile = lazy(() => import("./Profile"));
const NotFound = lazy(() => import("./404"));

// Protected Route component
const ProtectedRoute = ({ children, userEmail }) => {
  if (!userEmail) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

function App({ CustomRouter }) {
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || "");

  const [isAdmin, setIsAdmin] = useState(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    return adminStatus === "true";
  });

  const [clientEmail, setClientEmail] = useState(() => {
    return localStorage.getItem("clientEmail") || "";
  });

  // ✅ Ensures this effect runs ONLY ONCE on mount
  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem("isAdmin", isAdmin);
    }
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    }
    if (clientEmail) {
      localStorage.setItem("clientEmail", clientEmail);
    }
  }, [isAdmin, userEmail, clientEmail]);  // Update dependencies to match state variables being used

  return (
    <AppContent 
      CustomRouter={CustomRouter}
      userEmail={userEmail}
      setUserEmail={setUserEmail}
      isAdmin={isAdmin}
      setIsAdmin={setIsAdmin}
      clientEmail={clientEmail}
      setClientEmail={setClientEmail}
    />
  );
}

function AppContent({ 
  CustomRouter = Router,
  userEmail,
  setUserEmail,
  isAdmin,
  setIsAdmin,
  clientEmail,
  setClientEmail
}) {
  return (
    <CustomRouter>
      <AppRoutes
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        clientEmail={clientEmail}
        setClientEmail={setClientEmail}
      />
    </CustomRouter>
  );
}

function AppRoutes({ userEmail, setUserEmail, isAdmin, setIsAdmin, clientEmail, setClientEmail }) {
  const location = useLocation();

  return (
    <div className="app-container">
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <div className="content-wrapper">
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/questionnaire" element={
                <ProtectedRoute userEmail={userEmail}>
                  <Questionnaire userEmail={userEmail}/>
                </ProtectedRoute>
              } />
              <Route path="/questionnaire_A" element={
                <ProtectedRoute userEmail={userEmail}>
                  <Questionnaire_Admin setClientEmail={setClientEmail}/>
                </ProtectedRoute>
              } />
              <Route path="/questionnaire_C" element={
                <ProtectedRoute userEmail={userEmail}>
                  <Questionnaire_Client clientEmail={clientEmail} />
                </ProtectedRoute>
              } />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/sign-in"
                element={<Login setUserEmail={setUserEmail} setIsAdmin={setIsAdmin} />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profile" element={
                <ProtectedRoute userEmail={userEmail}>
                  <Profile userEmail={userEmail} setUserEmail={setUserEmail} setIsAdmin={setIsAdmin}/>
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
