import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, userRole, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-flex">
          <div className="navbar-logo-group">
            <div className="navbar-logo-icon-wrapper">
              <span className="navbar-logo-icon">📚</span>
            </div>
            <Link to="/" className="navbar-title">GT Library</Link>
          </div>
          <div className="navbar-links">
            <Link to="#" className="navbar-link">About</Link>
            <Link to="#" className="navbar-link">Contact</Link>
            <Link to="#" className="navbar-link">Help</Link>
            {isLoggedIn ? (
              <>
                <span className="navbar-user-info">Welcome, {userRole}!</span>
                <button onClick={handleLogout} className="navbar-button">Logout</button>
              </>
            ) : (
              <Link to="/login" className="navbar-button">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;