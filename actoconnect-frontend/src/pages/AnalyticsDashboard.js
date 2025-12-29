import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AnalyticsDashboard = () => {
  const [topSkills, setTopSkills] = useState([]);
  const [monthlyAuditions, setMonthlyAuditions] = useState([]);
  const [selectionRatio, setSelectionRatio] = useState(0);

  useEffect(() => {
    // Mock data
    setTopSkills([
      { skill: 'Acting', count: 150 },
      { skill: 'Dancing', count: 120 },
      { skill: 'Singing', count: 100 },
      { skill: 'Comedy', count: 80 }
    ]);
    setMonthlyAuditions([
      { month: 'Jan', count: 45 },
      { month: 'Feb', count: 52 },
      { month: 'Mar', count: 48 },
      { month: 'Apr', count: 61 }
    ]);
    setSelectionRatio(25); // 25% selection rate
  }, []);

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Dashboard</h1>
      <div className="charts-grid">
        <div className="chart-card">
          <h2>Top Skills</h2>
          <div className="bar-chart">
            {topSkills.map(skill => (
              <div key={skill.skill} className="bar">
                <span className="bar-label">{skill.skill}</span>
                <div className="bar-fill" style={{ width: `${(skill.count / 150) * 100}%` }}></div>
                <span className="bar-value">{skill.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <h2>Monthly Auditions</h2>
          <div className="line-chart">
            {monthlyAuditions.map(month => (
              <div key={month.month} className="line-point">
                <span className="point-label">{month.month}</span>
                <div className="point" style={{ height: `${(month.count / 70) * 100}px` }}></div>
                <span className="point-value">{month.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <h2>Selection Ratio</h2>
          <div className="pie-chart">
            <div className="pie">
              <div className="pie-fill" style={{ '--percentage': selectionRatio }}></div>
            </div>
            <div className="pie-legend">
              <span>Selected: {selectionRatio}%</span>
              <span>Rejected: {100 - selectionRatio}%</span>
            </div>
          </div>
        </div>
      </div>
      <Link to="/admin/dashboard">Back to Admin Dashboard</Link>
    </div>
  );
};

export default AnalyticsDashboard;