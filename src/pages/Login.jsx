import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/style.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const handleBack = () => navigate('/');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi login berhasil
    if (email && password) {
      alert('Login berhasil!');
      navigate('/dashboard');
    } else {
      alert('Email dan password harus diisi.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="back-button" onClick={handleBack} aria-label="Back to welcome page">←</button>

        <h2 className="login-title">Log in</h2>

        <form onSubmit={handleSubmit}>
          <label className="login-label">Email address or user name</label>
          <input
            type="email"
            className="login-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label">Create a password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="remember-me">
            <input type="checkbox" id="remember" className="checkbox-black" />
            <label htmlFor="remember" className="remember-label">Remember me</label>
          </div>

          <button type="submit" className="btn-login">Log in</button>
        </form>

        <div className="login-links">
          <Link to="/forgot-password" className="link-underline">Forget your password</Link>
          <p className="signup-text">
            Don’t have an account? <Link to="/signup" className="link-underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;