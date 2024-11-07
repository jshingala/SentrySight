// SignUp.jsx
import React from "react";
import './SignUp.css'; // Import the CSS file for styling

function SignUp() {
  return (
    <div className="sign-up">
      <h2>Sign Up / Register</h2>
      <form className="sign-up-form">
        <label>
          Name:
          <input type="text" name="name" placeholder="Enter your name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" placeholder="Enter your email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" placeholder="Create a password" />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SignUp;
