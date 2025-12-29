import React from 'react';
import { Link } from 'react-router-dom';

const ViewApplications = () => {
  const applications = [
    { id: 1, actor: 'John Doe', role: 'Lead Actor' },
    { id: 2, actor: 'Jane Smith', role: 'Supporting Actress' },
    // Add more
  ];

  return (
    <div className="center">
      <div className="card glass">
        <h2>Applications</h2>
        <ul>
          {applications.map(app => (
            <li key={app.id}>
              <strong>{app.actor}</strong> applied for <em>{app.role}</em>
            </li>
          ))}
        </ul>
        <p><Link to="/director/dashboard">Back to Dashboard</Link></p>
      </div>
    </div>
  );
};

export default ViewApplications;