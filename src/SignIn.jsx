import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './SignUp.css';

const Login = ({ setUserEmail, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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

          // Store isAdmin in localStorage and set state
          const isAdmin = data.results[0].isAdmin; // Assuming the response contains `isAdmin`
          localStorage.setItem("userEmail", email);
          localStorage.setItem("isAdmin", isAdmin);
          
          // Update the state in App.jsx
          setIsAdmin(isAdmin);

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
        />
        <button type="submit">Submit</button>
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
