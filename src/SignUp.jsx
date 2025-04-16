import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Signing.css'; // Import the CSS file for styling

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        business_name: '',
        contact_number: '',
        _share: false,
        successMessage: '',  //This will hold the success message
        isCodeSent: false,
        isVerified: false,
        code: '',
        verificationCode: ''
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

      //console.log(email);

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
        alert(data.error);
        window.location.reload();
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
      <div className="sign-up">
        {this.state.successMessage && 
        <div className="success">
            {this.state.successMessage}     {/*Success Message*/}
            <div className="to_login">
            <Link to="/sign-in">
              <button>Go back to Sign-in</button>
            </Link>
          </div>    
        </div>
        } 

        {!this.state.successMessage &&(
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <h2>Sign Up / Register</h2>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              id = "email"
              type="email"
              name="email"
              onChange={this.handleChange}
              placeholder="xxx@xxx.xxx"
              //pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              id = "password"
              type="password"
              name="password"
              onChange={this.handleChange}
              required
              minLength="12"
              placeholder="Enter your password"
              title="Password must be at least 12 characters long"
            />
          </div>
          <div>
            <label htmlFor="business_name">Business Name: </label>
            <input
              id = "business_name"
              type="text"
              name="business_name"
              onChange={this.handleChange}
              placeholder="Enter your business name"
            />
          </div>
          <div>
            <label htmlFor="contact_number">Contact Number: </label>
            <input
              id="contact_number"
              type="tel"
              name="contact_number"
              placeholder="(XXX)XXX-XXXX"
              pattern = "\(\d{3}\)\d{3}-\d{4}"
              required
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="signIn">Register</button>
        </form>
        )}

        {/* Verification code section */}
        {this.state.isCodeSent && !this.state.isVerified && (
          <div>
            <label>Enter the verification code sent to your email: </label>
            <input
              type="text"
              name="code"
              value={this.state.code}
              onChange={this.handleChange}
              placeholder="Enter verification code"
              required
            />
            <button onClick={this.verifyCode}>Verify Code</button>
          </div>
        )}
        
        {/* Display the error message */}
        {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
      </div>
    );
  }
}

export default Register;