import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/style.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">
          <span className="highlight">SafeTalks</span>, Jaga Percakapan <br />
          Anda Tetap Positif
        </h1>
        <p className="welcome-subtitle">
          "Dapatkan notifikasi instan dan bantu ciptakan ruang chat yang lebih sehat."
        </p>
        <p className="welcome-instruction">
          Log in with your account to continue
        </p>
        <div className="welcome-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/signup" className="btn-primary">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;