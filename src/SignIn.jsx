import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import './SignUp.css';

const Login = ({ setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!captchaValue) {
      setErrorMessage('Please complete the CAPTCHA');
      return;
    }

    fetch('http://localhost:3306/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email, 
        password,
        captchaToken: captchaValue 
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setUserEmail(email);
          setErrorMessage('');
          alert("You're successfully signed in!");
          navigate('/'); // Redirect to home page
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('An error occurred during sign in');
      });
  };

  return (
    <div className="sign-up">
      <h2>Login</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
          value={email}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Enter your password"
          value={password}
          required
        />
        <div className="captcha-container">
          <ReCAPTCHA
            sitekey="6LdpEeMqAAAAAMg7zfin2ikfx-a0iFa-1dZkRoGU"
            onChange={handleCaptchaChange}
            theme="dark"
          />
        </div>
        <button type="submit" disabled={!captchaValue}>Submit</button>
        <div className="register">
          <Link to="/sign-up">
            <button type="button">Go to Register</button>
          </Link>
          {/* "Don't have an account?" as a clickable link */}
          <p>
          Don't have an account? <Link to="/sign-up" className="sign-up-button">Sign up here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
