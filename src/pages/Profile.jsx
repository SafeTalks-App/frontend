import React, { useState, useEffect } from 'react';
import '../styles/style.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('https://backend-production-6662.up.railway.app/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await res.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>Failed to load profile</p>;

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
              <h3 className="profile-name">{userData.nickname || userData.name}</h3>
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
              <label>Nickname</label>
              <input type="text" value={userData.nickname || ''} disabled />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input type="text" value={userData.gender || ''} disabled />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Time Zone</label>
              <input type="text" value={userData.timezone || ''} disabled />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input type="text" value={userData.country || ''} disabled />
            </div>
          </div>

          <div className="email-section">
            <h4>My Email Address</h4>
            <div className="email-box">
              <FaEnvelope className="email-icon" />
              <div>
                <p className="email-address">{userData.email}</p>
                <p className="email-date">Updated recently</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;