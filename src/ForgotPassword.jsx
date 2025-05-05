import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import './Signing.css';

const FP = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const sendVerification = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3306/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        setIsCodeSent(true);
        alert('Verification code sent to your email!');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  const verifyCode = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3306/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const data = await response.json();
      if (response.ok) {
        const searchEmail = await fetch(`http://localhost:3306/user-profile?email=${email}`);       //reuse the function
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
        alert(data.error);
      }
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  const changePassword = (event) => {
    event.preventDefault();

    if (password == cPassword){
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
        if (data.error) {
            // If there's an error, display it to the user
            alert(data.error);
            window.location.reload();
        } else {
            alert("Updated Successfully!");
            navigate('/sign-in');
        }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
  };

  return (
    <div className="sign-up">
        {!isVerified && !isCodeSent && (
            <form className="FP-form" onSubmit={sendVerification}>
                <h2>Forgot your password?</h2>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter your email"
                    value={email}
                    required
                />
                <div>
                    <button type="submit" className="signIn">Send verification code</button>
                </div>
                <Link to="/sign-in" className="FP-back">Back to Sign in</Link>
            </form>
        )}
        {isCodeSent && !isVerified && (
            <form className="FP-form">
                <h2>Forgot your password?</h2>
                <div className="verify-section">
                <p>Enter Verification Code</p>
                <input
                    type="text"
                    placeholder="Enter the code:"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button type="button" className="signIn" onClick={verifyCode}>Verify Code</button>
                </div>
            </form>    
        )}
        {isVerified && (
        <form className="FP-form" onSubmit={changePassword}>
            <h2>Reset Password</h2>
                <p>New password</p>
                <div className="input-container">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    minLength="12"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span className="eye-icon" onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
                </div>
                <p>Confirm password</p>
                <div className="input-container">
                <input
                    type={showCPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                />
                <span className="eye-icon" onClick={() => setShowCPassword(prev => !prev)}>
                    {showCPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
            </div>
            {password && password !== cPassword && (
                <div className="error">Password Not Matching</div>
            )}
            <div>
                <button type="submit" className="signIn">Reset password</button>
            </div>
            </form>
            )}
    </div>
  );  
};

export default FP;
