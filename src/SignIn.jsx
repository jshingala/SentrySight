import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import './Signing.css';

const Login = ({ setUserEmail, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3306/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setUserEmail(email);
          localStorage.setItem("userEmail", email);

          // Store isAdmin in localStorage and set state
          const isAdmin = data.results[0].isAdmin; // Assuming the response contains `isAdmin`
          if (isAdmin){
            setIsAdmin(isAdmin);
            localStorage.setItem("isAdmin", isAdmin);
          }

          setErrorMessage('');
          alert("You're successfully signed in!");
          navigate('/'); // Redirect to home page
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="sign-up">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            value={password}
          />
          <span className="eye-icon" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <Link to="/FP" className="FP">Forgot password?</Link>
        <div>
          <button type="submit" className="signIn">Sign in</button>
        </div>
        <div className="register">
          <p>
          Don't have an account? <Link to="/sign-up" className="sign-up-button">Sign up here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
