import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/style.css";

const VerifyCode = () => {
  const navigate = useNavigate();
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState('');

  const handleBack = () => navigate('/forgot-password');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleResend = () => {
    alert('Verification code has been resent.');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button
          className="back-button"
          onClick={handleBack}
          aria-label="Back to Forgot Password page"
        >
          ←
        </button>

        <h2 className="login-title">Verify Code</h2>
        <p className="login-subtext">
          An authentication code has been sent to your email.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="login-label">Enter a code</label>
          <div className="password-wrapper">
            <input
              type={showCode ? 'text' : 'password'}
              className="login-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? '🙈 Hide' : '👁️ Show'}
            </button>
          </div>

            <p className="resend-text">
            Didn’t receive a code?{' '}
            <span className="resend-link" onClick={handleResend}>
                Resend
            </span>
            </p>

          <button type="submit" className="btn-login" style={{ marginTop: '2rem' }}>
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;