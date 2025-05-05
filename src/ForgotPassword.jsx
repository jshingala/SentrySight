import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import './SignIn.css';

const FP = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const sendVerification = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3306/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setIsCodeSent(true);
        alert('Verification code sent to your email!');
      } else {
        alert(data.error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error sending code:', error);
    }
  };

  const verifyCode = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3306/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const data = await response.json();
      if (response.ok) {
        const searchEmail = await fetch(`http://localhost:3306/user-profile?email=${email}`);
        setIsLoading(false);
        if (searchEmail.ok){
            setIsVerified(true);
            alert('Email verified successfully!');
        }else{
            alert("Email not found.");
            setIsVerified(false);
            setIsCodeSent(false);
            setEmail('');
            setCode('');
        }
      } else {
        setIsLoading(false);
        alert(data.error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error verifying code:', error);
    }
  };

  const changePassword = (event) => {
    event.preventDefault();
    
    if (password !== cPassword) {
      return;
    }

    setIsLoading(true);
    fetch('http://localhost:3306/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email: email.trim(),
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
      setIsLoading(false);
      if (data.error) {
          alert(data.error);
          window.location.reload();
      } else {
          alert("Updated Successfully!");
          navigate('/sign-in');
      }
    })
    .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
    });
  };

  const getIcon = () => {
    if (!isVerified && !isCodeSent) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      );
    } else if (isCodeSent && !isVerified) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3h18v18H3zM11 9h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      );
    }
  };

  const getTitle = () => {
    if (!isVerified && !isCodeSent) return "Forgot Password?";
    if (isCodeSent && !isVerified) return "Enter Verification Code";
    return "Reset Password";
  };

  const getDescription = () => {
    if (!isVerified && !isCodeSent) return "Enter your email address to receive a verification code";
    if (isCodeSent && !isVerified) return "We've sent a verification code to your email";
    return "Create a new password for your account";
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            {getIcon()}
          </div>
          <h2>{getTitle()}</h2>
          <p>{getDescription()}</p>
        </div>
        
        {!isVerified && !isCodeSent && (
          <form className="login-form" onSubmit={sendVerification}>
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
            <button type="submit" className={`submit-button ${isLoading ? 'loading' : ''}`}>
              {isLoading ? <div className="loader"></div> : "Send verification code"}
            </button>
            <div className="divider">
              <span>or</span>
            </div>
            <Link to="/sign-in" className="register-button">Back to Sign in</Link>
          </form>
        )}

        {isCodeSent && !isVerified && (
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <input
                  type="text"
                  placeholder="Enter verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
              />
            </div>
            <button type="button" className={`submit-button ${isLoading ? 'loading' : ''}`} onClick={verifyCode}>
              {isLoading ? <div className="loader"></div> : "Verify Code"}
            </button>
          </form>    
        )}

        {isVerified && (
          <form className="login-form" onSubmit={changePassword}>
            <p className="password-hint">The password should have at least 12 characters</p>
            
            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  minLength="12"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            
            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                  type={showCPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  required
              />
              <span className="eye-icon" onClick={() => setShowCPassword(prev => !prev)}>
                  {showCPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            
            {password && password !== cPassword && (
                <div className="error-message">Passwords do not match</div>
            )}
            
            <button type="submit" className={`submit-button ${isLoading ? 'loading' : ''}`} disabled={password !== cPassword}>
              {isLoading ? <div className="loader"></div> : "Reset Password"}
            </button>
          </form>
        )}
      </div>
      
      <div className="background-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );  
};

export default FP;