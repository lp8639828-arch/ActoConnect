import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/actor/dashboard">Dashboard</Link></li>
          <li><Link to="/actor/profile">Profile</Link></li>
          <li><Link to="/actor/portfolio">Portfolio</Link></li>
          <li><Link to="/actor/auditions">Auditions</Link></li>
          <li><Link to="/actor/networking">Networking</Link></li>
          <li><Link to="/director/dashboard">Director Dashboard</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;