import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      business_name: '',
      contact_number: '',
      _share: false,
      successMessage: '',
      isCodeSent: false,
      isVerified: false,
      code: '',
      verificationCode: '',
      errorMessage: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;

    // Send POST request to backend to send verification code
    this.sendVerificationCode(email);
  };

  // Handle sending verification code
  sendVerificationCode = async (email) => {
    try {
      const response = await fetch('http://localhost:3306/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      console.log(email);

      const data = await response.json();
      if (response.ok) {
        this.setState({ isCodeSent: true, verificationCode: data.code });
        alert('Verification code sent to your email!');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  // Handle verification code check
  verifyCode = async () => {
    const { email, code } = this.state;
    try {
      const response = await fetch('http://localhost:3306/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const data = await response.json();
      if (response.ok) {
        this.setState({ isVerified: true });
        alert('Email verified successfully! Proceeding to registration...');
        // After successful verification, submit the actual registration request
        this.registerUser();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  // Register user after email is verified
  registerUser = () => {
    const { email, password, business_name, contact_number, _share } = this.state;

    // Send POST request to backend to register user
    fetch('http://localhost:3306/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, business_name, contact_number, _share })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // If there's an error, display it to the user
        this.setState({ errorMessage: data.error });
      } else {
        this.setState({ successMessage: "You're successfully registered!", errorMessage: '' });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      this.setState({ errorMessage: error.message });
    });
  };

  render() {
    return (
      <section className="container">
        <div className="card" style={{ maxWidth: "500px", margin: "40px auto", padding: "40px" }}>
          <h2 className="text-center" style={{ marginBottom: "24px" }}>Sign Up / Register</h2>
          
          {this.state.successMessage && (
            <div style={{ 
              backgroundColor: "rgba(0, 255, 0, 0.1)", 
              color: "#4CAF50", 
              padding: "20px", 
              borderRadius: "8px", 
              marginBottom: "20px",
              textAlign: "center"
            }}>
              <p style={{ marginBottom: "15px" }}>{this.state.successMessage}</p>
              <Link to="/sign-in">
                <button className="btn">Go back to Sign-in</button>
              </Link>
            </div>
          )}

          {!this.state.successMessage && (
            <form onSubmit={this.handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Email:</label>
                <input
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="xxx@xxx.xxx"
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
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Password:</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  required
                  minLength="12"
                  placeholder="Enter your password"
                  title="Password must be at least 12 characters long"
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
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Business Name:</label>
                <input
                  type="text"
                  name="business_name"
                  onChange={this.handleChange}
                  placeholder="Enter your business name"
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
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Contact Number:</label>
                <input
                  type="tel"
                  name="contact_number"
                  placeholder="(XXX)XXX-XXXX"
                  pattern="\(\d{3}\)\d{3}-\d{4}"
                  required
                  onChange={this.handleChange}
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
              
              <button type="submit" className="btn" style={{ width: "100%" }}>Register</button>
              
              <div className="text-center" style={{ marginTop: "20px" }}>
                <p className="text-light">
                  Already have an account? <Link to="/sign-in" style={{ color: "#8a89e6", textDecoration: "none" }}>Sign in here</Link>
                </p>
              </div>
            </form>
          )}

          {/* Verification code section */}
          {this.state.isCodeSent && !this.state.isVerified && (
            <div className="card" style={{ marginTop: "20px", padding: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
                Enter the verification code sent to your email:
              </label>
              <input
                type="text"
                name="code"
                value={this.state.code}
                onChange={this.handleChange}
                placeholder="Enter verification code"
                required
                style={{ 
                  width: "100%", 
                  padding: "10px", 
                  borderRadius: "8px", 
                  border: "1px solid #444",
                  backgroundColor: "#333",
                  color: "white",
                  marginBottom: "15px"
                }}
              />
              <button onClick={this.verifyCode} className="btn" style={{ width: "100%" }}>
                Verify Code
              </button>
            </div>
          )}
          
          {/* Display the error message */}
          {this.state.errorMessage && (
            <div style={{ 
              backgroundColor: "rgba(255, 0, 0, 0.1)", 
              color: "#ff6b6b", 
              padding: "10px", 
              borderRadius: "8px", 
              marginTop: "20px",
              textAlign: "center"
            }}>
              {this.state.errorMessage}
            </div>
          )}
          
          <div className="text-center" style={{ marginTop: "20px" }}>
            <Link to="/sign-in" style={{ color: "#8a89e6", textDecoration: "none" }}>
              Back to Sign In
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;