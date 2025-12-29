import React, { useState, useEffect } from 'react';
import { getUserProfile, getNotifications } from '../services/userService';

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      fetchProfile(user._id);
      fetchNotifications(user._id);
    }
  }, []);

  const fetchProfile = async (id) => {
    try {
      const res = await getUserProfile(id);
      setProfile(res.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async (userId) => {
    try {
      const res = await getNotifications(userId);
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="profile-container">
      <div className="tabs">
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</button>
        <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>Notifications</button>
      </div>
      {activeTab === 'profile' && (
        <div className="profile-view">
          {profile.photo && <img src={profile.photo} alt="Profile" className="profile-photo" />}
          <h2>{profile.name}</h2>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          {profile.role === 'actor' && (
            <>
              <p><strong>Gender:</strong> {profile.gender}</p>
              <p><strong>Height:</strong> {profile.height}</p>
              <p><strong>Weight:</strong> {profile.weight}</p>
              <p><strong>Skin Tone:</strong> {profile.skinTone}</p>
              <p><strong>Skills:</strong> {profile.skills?.join(', ')}</p>
            </>
          )}
          {profile.role === 'director' && (
            <>
              <p><strong>Company:</strong> {profile.company}</p>
              <p><strong>Genre:</strong> {profile.genre}</p>
              <p><strong>Past Projects:</strong> {profile.pastProjects?.join(', ')}</p>
              <p><strong>Experience:</strong> {profile.experience}</p>
            </>
          )}
          <p><strong>City:</strong> {profile.city}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Profile Completion:</strong> {profile.profileCompletion}%</p>
        </div>
      )}
      {activeTab === 'notifications' && (
        <div className="notifications">
          <h3>Notifications</h3>
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map(notif => (
              <div key={notif._id} className="notification">
                <p>{notif.message}</p>
                <small>{new Date(notif.createdAt).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;