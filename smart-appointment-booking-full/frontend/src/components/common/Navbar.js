import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          📅 Smart Appointment
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}
              <div className="navbar-user">
                <span className="user-name">Hello, {user?.name}</span>
                <button onClick={handleLogout} className="btn btn-sm btn-outline">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
              <Link to="/register" className="btn btn-sm btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};