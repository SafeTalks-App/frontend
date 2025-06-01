import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/style.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate('/login');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verify-code');
  };  

  return (
    <div className="login-container">
      <div className="login-box">
        <button
          className="back-button"
          onClick={handleBack}
          aria-label="Back to login page"
        >
          ←
        </button>

        <h2 className="login-title">Forgot your password?</h2>
        <p className="login-subtext">
          Enter your email below to recover your password
        </p>

        <form onSubmit={handleSubmit}>
          <label className="login-label">Email Address</label>
          <input
            type="email"
            className="login-input"
            placeholder="Enter your email address"
            required
          />

          <button type="submit" className="btn-login">
            Send a Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;