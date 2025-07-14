import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Announcements from './components/Announcements';
import Documents from './components/Documents';
import Schedules from './components/Schedules';
import Requests from './components/Requests';
import Directory from './components/Directory';
import Users from './components/Users';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

const user = {
  id: 1,
  username: 'admin',
  role: 'Admin'
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/users" element={user.role === 'Admin' ? <Users /> : <Navigate to="/" />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
