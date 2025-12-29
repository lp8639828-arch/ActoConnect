import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNotifications } from '../../services/userService';

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user && user._id) {
      const fetchNotifications = async () => {
        try {
          const response = await getNotifications(user._id);
          setNotifications(response.data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      fetchNotifications();
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          🎥 ACTOCONNECT
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/actors">Actors</Link></li>
        <li><Link to="/directors">Directors</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li className="notification-icon" onClick={() => setShowDropdown(!showDropdown)}>
          🔔
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          {showDropdown && (
            <div className="notification-dropdown">
              {notifications.length === 0 ? (
                <p>No notifications</p>
              ) : (
                notifications.map(notification => (
                  <div key={notification._id} className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}>
                    <p>{notification.message}</p>
                    <small>{new Date(notification.createdAt).toLocaleDateString()}</small>
                  </div>
                ))
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;