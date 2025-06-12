import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/style.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">
          <span className="highlight">SafeTalks</span>, Keep Your <br />
          Conversations Positive
        </h1>
        <p className="welcome-subtitle">
          "Get instant feedback and help create a healthier chat space."
        </p>
        <p className="welcome-instruction">
          Log in with your account to continue.
        </p>
        <div className="welcome-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;