import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import RoomChat from '../pages/RoomChat';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/room-chat" element={<RoomChat />} />
    </Routes>
  );
};

export default AppRoutes;