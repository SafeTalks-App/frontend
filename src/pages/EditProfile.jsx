import React, { useState, useEffect } from 'react';
import '../styles/style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {};

  const [formData, setFormData] = useState({
    nickname: '',
    gender: '',
    timezone: '',
    country: '',
    email: '',
  });

  useEffect(() => {
    setFormData({
      nickname: userData.nickname || '',
      gender: userData.gender || '',
      timezone: userData.timezone || '',
      country: userData.country || '',
      email: userData.email || '',
    });
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('https://backend-production-6662.up.railway.app/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nickname: formData.nickname,
          gender: formData.gender,
          timezone: formData.timezone,
          country: formData.country,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save profile');
      }

      console.log('Profile updated successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again later.');
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <button className="back-button" onClick={() => navigate('/profile')}>
          <FaArrowLeft />
        </button>
      </div>

      <div className="edit-profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nickname</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Time Zone</label>
            <select name="timezone" value={formData.timezone} onChange={handleChange}>
              <option value="">Select</option>
              <option>UTC+0</option>
              <option>UTC+7</option>
              <option>UTC+8</option>
              <option>UTC+9</option>
            </select>
          </div>
          <div className="form-group">
            <label>Country</label>
            <select name="country" value={formData.country} onChange={handleChange}>
              <option value="">Select</option>
              <option>Indonesia</option>
              <option>USA</option>
              <option>Japan</option>
              <option>UK</option>
            </select>
          </div>
        </div>

        <div className="form-group email-disabled">
          <label>Email</label>
          <input type="email" value={formData.email} disabled />
        </div>

        <div className="form-actions">
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;