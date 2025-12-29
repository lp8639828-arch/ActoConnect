import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="center">
      <div className="card glass slide-up">
        <h2>Admin Dashboard</h2>
        <div className="stats">
          <div className="stat-card">Total Actors: 100</div>
          <div className="stat-card">Total Auditions: 20</div>
          <div className="stat-card">Daily Registrations: 5</div>
        </div>
        <h3>Analytics</h3>
        <div className="chart">
          <div className="chart-bar" style={{height: '60%'}}>Most Viewed Actor</div>
          <div className="chart-bar" style={{height: '40%'}}>Trending Skills</div>
          <div className="chart-bar" style={{height: '80%'}}>Monthly Auditions</div>
        </div>
        <p>Success Ratio: 70%</p>
        <button>Verify Audition</button>
        <button>Remove User</button>
      </div>
    </div>
  );
};

export default AdminDashboard;