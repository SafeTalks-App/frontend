import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "../styles/style.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const handleBack = () => navigate('/');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('All fields are required.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://backend-production-6662.up.railway.app/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || 'Signup failed.');
      } else {
        alert(data.msg || 'Signup successful!');

        const loginResponse = await fetch('https://backend-production-6662.up.railway.app/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include'
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          localStorage.setItem('token', loginData.token);
          localStorage.setItem('username', loginData.user.name);
          localStorage.setItem('user_id', loginData.user.id);
          localStorage.setItem('email', loginData.user.email);
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      }
    } catch (error) {
      alert('Something went wrong during signup.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="back-button" onClick={handleBack} aria-label="Back to welcome page">←</button>

        <h2 className="login-title">Create an account</h2>
        <p className="login-subtext">
          Already have an account? <Link to="/login" className="link-underline">Log in</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <label className="login-label">What should we call you?</label>
          <input
            type="text"
            className="login-input"
            placeholder="Enter your user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            minLength="2"
          />

          <label className="login-label">What's your email?</label>
          <input
            type="email"
            className="login-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label className="login-label">Create a password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Enter your password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength="6"
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

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Creating account...' : 'Create an account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;