import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import './SignIn.css';

const Login = ({ setUserEmail, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    fetch('http://localhost:3306/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setUserEmail(email);
          localStorage.setItem("userEmail", email);

          const isAdmin = data.results[0].isAdmin;
          if (isAdmin){
            setIsAdmin(isAdmin);
            localStorage.setItem("isAdmin", isAdmin);
          }

          setErrorMessage('');
          alert("You're successfully signed in!");
          navigate('/');
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue to your account</p>
        </div>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              value={email}
              required
            />
          </div>
          
          <div className="input-group">
            <div className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              value={password}
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          
          <Link to="/FP" className="forgot-password">Forgot password?</Link>
          
          <button type="submit" className={`submit-button ${isLoading ? 'loading' : ''}`}>
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              <>
                Sign In
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
  
          <p className="signup-link">
            Don't have an account? <Link to="/sign-up">Sign up here</Link>
          </p>
        </form>
      </div>
      
      <div className="background-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
}

export default Login;