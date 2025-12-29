import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import SwipeSection from '../../components/SwipeSection';
import MediaCard from '../../components/MediaCard';
import DialogCarousel from '../../components/DialogCarousel';
import { createSuccessStory, getAuditions, getApplications } from '../../services/userService';

const ActorDashboard = () => {
  const [showSuccessForm, setShowSuccessForm] = useState(false);
  const [successStory, setSuccessStory] = useState({ story: '', photo: '' });
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const matchPercent = 90;
  const currentLevel = 2; // 1: Beginner, 2: Rising Star, 3: Superstar
  const levelProgress = 65; // Progress towards next level
  const talentScore = user.profileCompletion || 75; // Use profile completion as talent score

  const levels = [
    { name: 'Beginner', icon: '🌟' },
    { name: 'Rising Star', icon: '⭐' },
    { name: 'Superstar', icon: '💫' }
  ];

  const handlePostSuccessStory = async () => {
    try {
      await createSuccessStory({
        actorName: user.name,
        story: successStory.story,
        photo: successStory.photo
      });
      setMessage('Success story posted successfully!');
      setSuccessStory({ story: '', photo: '' });
      setShowSuccessForm(false);
    } catch (error) {
      setMessage('Failed to post success story.');
    }
  };

  const profileOverviews = [
    {
      image: 'https://via.placeholder.com/300x200/FFF0F5/FFE066?text=Profile+Photo',
      title: 'Update Profile',
      description: 'Keep your profile current with latest headshots and bio'
    },
    {
      image: 'https://via.placeholder.com/300x200/FFF0F5/FF5DA2?text=Skills+Assessment',
      title: 'Skills Assessment',
      description: 'Take our skill assessment to improve your ranking'
    },
    {
      image: 'https://via.placeholder.com/300x200/FFF0F5/7B2CBF?text=Portfolio+Review',
      title: 'Portfolio Review',
      description: 'Get feedback on your portfolio from industry experts'
    }
  ];

  const [latestAuditions, setLatestAuditions] = useState([]);
  const [activeAuditionsCount, setActiveAuditionsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [auditionsResponse, applicationsResponse] = await Promise.all([
          getAuditions(),
          user._id ? getApplications(user._id) : Promise.resolve({ data: [] })
        ]);
        setLatestAuditions(auditionsResponse.data.slice(0, 3));
        setActiveAuditionsCount(applicationsResponse.data.length);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, [user._id]);

  return (
    <div className="dashboard-container actor-dashboard">
      {/* Talent Growth Tracker */}
      <div className="talent-growth-section">
        <h2 className="section-title">Talent Growth Tracker</h2>
        <div className="level-tracker">
          <div className="current-level">
            <span className="level-icon">{levels[currentLevel - 1].icon}</span>
            <span className="level-name">{levels[currentLevel - 1].name}</span>
          </div>
          <div className="level-bar">
            <div className="level-progress" style={{ width: `${levelProgress}%` }}></div>
          </div>
          <div className="next-level">
            <span className="level-icon">{levels[currentLevel].icon}</span>
            <span className="level-name">{levels[currentLevel].name}</span>
          </div>
        </div>
        <p className="progress-text">{levelProgress}% towards {levels[currentLevel].name}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{talentScore}%</div>
          <div className="stat-label">Talent Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{matchPercent}%</div>
          <div className="stat-label">Match Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{activeAuditionsCount}</div>
          <div className="stat-label">Active Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user.followers?.length || 0}</div>
          <div className="stat-label">Network Connections</div>
        </div>
      </div>

      <SwipeSection title="Profile Overview">
        {profileOverviews.map((item, index) => (
          <MediaCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            onClick={() => {
              if (item.title === 'Update Profile') {
                navigate('/actor/profile');
              } else {
                // Handle other navigation cases
                navigate('/actor/profile');
              }
            }}
          />
        ))}
      </SwipeSection>

      <SwipeSection title="Latest Auditions">
        {latestAuditions.length === 0 ? (
          <p>No auditions available at the moment.</p>
        ) : (
          latestAuditions.map((audition) => (
            <MediaCard
              key={audition._id}
              image={audition.directorId?.photo || 'https://via.placeholder.com/300x200/FFF0F5/FFE066?text=Audition'}
              title={audition.title}
              description={`${audition.role} - ${audition.description?.substring(0, 60)}...`}
              onClick={() => navigate('/actor/auditions')}
            />
          ))
        )}
      </SwipeSection>

      {/* Success Story Section */}
      <div className="success-story-section">
        <h2 className="section-title">Share Your Success</h2>
        <Button onClick={() => setShowSuccessForm(!showSuccessForm)} className="btn-primary">
          {showSuccessForm ? 'Cancel' : 'Post Success Story'}
        </Button>
        {showSuccessForm && (
          <div className="success-form">
            <textarea
              placeholder="Share your success story..."
              value={successStory.story}
              onChange={(e) => setSuccessStory({ ...successStory, story: e.target.value })}
              rows="4"
              className="input"
            />
            <input
              type="text"
              placeholder="Photo URL (optional)"
              value={successStory.photo}
              onChange={(e) => setSuccessStory({ ...successStory, photo: e.target.value })}
              className="input"
            />
            <Button onClick={handlePostSuccessStory} className="btn-success">Post Story</Button>
          </div>
        )}
        {message && <p className="message">{message}</p>}
      </div>

      <div className="dashboard-actions">
        <Link to="/actor/profile">
          <Button className="ripple-btn btn-primary">View Full Profile</Button>
        </Link>
        <Link to="/actor/auditions">
          <Button className="ripple-btn btn-accent">Browse All Auditions</Button>
        </Link>
      </div>

      <DialogCarousel />
    </div>
  );
};

export default ActorDashboard;