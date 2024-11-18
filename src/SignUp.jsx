import React, { Component } from "react";
import { Link } from "react-router-dom";
import './SignIn.css'; // Import the CSS file for styling

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        business_name: '',
        contact_number: '',
        _share: false,
        successMessage: ''  //This will hold the success message
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, business_name, contact_number, _share } = this.state;

    // Send POST request to backend
    fetch('http://localhost:3306/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, business_name, contact_number, _share })
      })
        .then(response => {
            //console.log(response);
            return response.json()
        })
        .then(data => {
            if (data.error) {
                // If there's an error, display it to the user
                this.setState({ errorMessage: data.error });
              }else {
                this.setState({ successMessage: "You're successfully registered!", errorMessage: '' });
              }
        })
        .catch(error => {
          console.error('Error:', error);

          this.setState({ errorMessage: error.message });   //display the UNIQUE key error to the user
        });
  };

  render() {
    return (
      <div className="sign-up-form">
        <h2>Sign Up / Register</h2>
        {this.state.successMessage && 
        <div className="success">
            {this.state.successMessage}     {/*Success Message*/}
            <div className="to_login">
            <Link to="/sign-in">
              <button>Go back to Sign-up</button>
            </Link>
          </div>    
        </div>
        } 

        {!this.state.successMessage &&(
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              placeholder="xxx@xxx.xxx"
              //pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
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
            <label>Business Name: </label>
            <input
              type="text"
              name="business_name"
              onChange={this.handleChange}
              placeholder="Enter your business name"
            />
          </div>
          <div>
            <label>Contact Number: </label>
            <input
              type="tel"
              name="contact_number"
              placeholder="(XXX)XXX-XXXX"
              pattern = "\(\d{3}\)\d{3}-\d{4}"
              required
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        )}
        
        {/* Display the error message */}
        {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
      </div>
    );
  }
}

export default Register;