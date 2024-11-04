import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import './navbar.css';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget); // Open dropdown
  };

  const handleClose = () => {
    setAnchorEl(null); // Close dropdown
  };

  const handleLogout = () => {
    logout();
    handleClose(); // Close dropdown on logout
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <div style={{ width: '40px', height: '40px' }}>
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2>LINGO Translator</h2>
      </Link>

      <div style={{ marginLeft: 'auto' }}>
        <nav className="nav">
          <ul>
            <Link to="/emojiText">Emoji to Text</Link>
            <Link to="/viewposts">Discussion Forum</Link>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link to="/signup" className="signup-button">
              <span className="signup-text">Sign Up</span>
            </Link>

            <Link to="/login" className="login-button">
              <span className="login-text">Log In</span>
            </Link>

            {/* Icon Button with Dropdown */}
            <IconButton className="icon-button" onClick={handleIconClick}>
              <AccountCircle sx={{ fontSize: '2rem', color: '#292524' }} />
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {user ? (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link to="/viewprofile" className="dropdown-item">View User Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} className="dropdown-item">Log Out</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleClose}>
                    <Link to="/login" className="dropdown-item">Log In</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/signup" className="dropdown-item">Sign Up</Link>
                  </MenuItem>
                </>
              )}
            </Menu>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
