// client/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/">Dashboard</Link>
        {user && user.uid && !user.isAnonymous && (
          <Link to="/create-event" style={{ marginLeft: '1rem' }}>
            Create Event
          </Link>
        )}
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>
              Hello, {user.displayName || user.email || "Guest"}
            </span>
            {!user.isAnonymous && (
              <button className="button" onClick={handleLogout}>
                Logout
              </button>
            )}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{ marginLeft: '1rem' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
