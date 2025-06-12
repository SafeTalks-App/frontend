import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "../styles/style.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const handleBack = () => navigate('/');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Email and password are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || 'Login failed.');
      } else {
        alert('Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('email', data.user.email);
        navigate('/dashboard');
      }
    } catch (error) {
      alert('An error occurred during login.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="back-button" onClick={handleBack} aria-label="Back to welcome page">←</button>
        <h2 className="login-title">Log in</h2>

        <form onSubmit={handleSubmit}>
          <label className="login-label">Email address</label>
          <input
            type="email"
            className="login-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label className="login-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePassword}
              aria-label="Toggle password visibility"
              disabled={loading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember" className="checkbox-black" disabled={loading} />
            <label htmlFor="remember" className="remember-label">Remember me</label>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Loading...' : 'Log in'}
          </button>
        </form>

        <div className="login-links">
          <p className="signup-text">
            Don't have an account? <Link to="/signup" className="link-underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;