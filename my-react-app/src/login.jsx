import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, password } = this.state;

    // Send POST request to the backend
    fetch('http://localhost:3306/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
        if (data.message) {
          alert('Login data submitted successfully');
        } else {
          alert('Failed to submit login data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <div className="id">
            <label htmlFor="id">Enter ID:</label>
            <input type="text" name="id" onChange={this.handleChange} />
          </div>
          <div className="password">
            <label htmlFor="password">Enter password:</label>
            <input type="password" name="password" onChange={this.handleChange} />
          </div>
          <div className="submit">
            <button type="submit">Submit</button>
          </div>
          <div className="register">
            <p>Don't have an account?</p>
            <Link to="/register">
              <button>Go to Register</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
