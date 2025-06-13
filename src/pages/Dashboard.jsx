import React, { useEffect } from 'react';
import '../styles/style.css';
import { FaUser, FaSignOutAlt, FaDiscord, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const openDiscordBot = () => {
    window.open(
      'https://discord.com/oauth2/authorize?client_id=1374891764183466086&scope=bot%20applications.commands',
      '_blank'
    );
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/profile')}>
              <FaUser /> Profile
            </li>
            <li onClick={openDiscordBot} title="Invite the SafeTalks bot to your Discord server">
              <FaDiscord /> SafeTalks Discord
            </li>
            <li onClick={() => navigate('/room-chat')}>
              <FaComments /> Room Chat
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <button className="btn-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="dashboard-welcome">
          <h1>
            Welcome to <span className="highlight">SafeTalks</span>!
          </h1>
          <p>A secure platform for private and encrypted chats.</p>
        </div>

        <section className="feature-section">
          <div className="feature-card">
            <img src="https://img.icons8.com/fluency-systems-regular/48/lock--v1.png" alt="Encryption" />
            <h3>End-to-End Encryption</h3>
            <p>All messages are secured with end-to-end encryption.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/fluency-systems-regular/48/user.png" alt="Private" />
            <h3>Private Messaging</h3>
            <p>Send confidential messages only you and the recipient can read.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/fluency-systems-regular/48/shield.png" alt="Secure" />
            <h3>Secure Platform</h3>
            <p>Your privacy and security are our top priorities.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;