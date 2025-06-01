import React, { useState } from 'react';
import '../styles/style.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();

  const [userData] = useState({
    nickname: 'brooo',
    email: 'brooowww@gmail.com',
    gender: 'Male',
    timezone: 'UTC+7',
    country: 'Indonesia',
    emailUpdated: '1 month ago',
  });

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft />
        </button>
      </div>

      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar-wrapper">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt="avatar"
              className="profile-avatar"
            />
            <div className="profile-info">
              <h3 className="profile-name">{userData.nickname}</h3>
              <p className="profile-email">{userData.email}</p>
            </div>
          </div>
          <button
            className="edit-button"
            onClick={() => navigate('/edit-profile', { state: userData })}
          >
            Edit
          </button>
        </div>

        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nick Name</label>
              <input type="text" value={userData.nickname} disabled />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input type="text" value={userData.gender} disabled />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Time Zone</label>
              <input type="text" value={userData.timezone} disabled />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input type="text" value={userData.country} disabled />
            </div>
          </div>

          <div className="email-section">
            <h4>My Email Address</h4>
            <div className="email-box">
              <FaEnvelope className="email-icon" />
              <div>
                <p className="email-address">{userData.email}</p>
                <p className="email-date">{userData.emailUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;