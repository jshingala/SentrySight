import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
          localStorage.setItem("userEmail", email);
          // Store isAdmin in localStorage and set state
          const isAdmin = data.results[0].isAdmin; // Assuming the response contains `isAdmin`
          if (isAdmin) {
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
    <section className="container">
      <div className="card" style={{ maxWidth: "500px", margin: "40px auto", padding: "40px" }}>
        <h2 className="text-center" style={{ marginBottom: "24px" }}>Login</h2>
        
        {errorMessage && (
          <div style={{ 
            backgroundColor: "rgba(255, 0, 0, 0.1)", 
            color: "#ff6b6b", 
            padding: "10px", 
            borderRadius: "8px", 
            marginBottom: "20px",
            textAlign: "center"
          }}>
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              value={email}
              required
              style={{ 
                width: "100%", 
                padding: "10px", 
                borderRadius: "8px", 
                border: "1px solid #444",
                backgroundColor: "#333",
                color: "white"
              }}
            />
          </div>
          
          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              value={password}
              style={{ 
                width: "100%", 
                padding: "10px", 
                borderRadius: "8px", 
                border: "1px solid #444",
                backgroundColor: "#333",
                color: "white"
              }}
            />
          </div>
          
          <button type="submit" className="btn" style={{ width: "100%", marginBottom: "20px" }}>
            Login
          </button>
          
          <div className="text-center" style={{ marginTop: "20px" }}>
            <p className="text-light">
              Don't have an account? <Link to="/sign-up" style={{ color: "#8a89e6", textDecoration: "none" }}>Sign up here</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;