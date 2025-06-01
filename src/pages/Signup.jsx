import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/style.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const handleBack = () => navigate('/');

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="back-button" onClick={handleBack} aria-label="Back to welcome page">←</button>

        <h2 className="login-title">Create an account</h2>
        <p className="login-subtext">
          Already have an account? <Link to="/login" className="link-underline">Log in</Link>
        </p>

        <form>
          <label className="login-label">What should we call you?</label>
          <input type="text" className="login-input" placeholder="Enter your user name" required />

          <label className="login-label">What’s your email?</label>
          <input type="email" className="login-input" placeholder="Enter your email address" required />

          <label className="login-label">Create a password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePassword}
              aria-label="Toggle password visibility"
            >
              {showPassword ? '🙈 Hide' : '👁️ Show'}
            </button>
          </div>

          <button type="submit" className="btn-login">Create an account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;