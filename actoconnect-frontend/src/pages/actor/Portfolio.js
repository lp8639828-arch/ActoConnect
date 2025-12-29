import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const photos = ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'];
  const videos = ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'];
  const achievements = ['Award 1', 'Award 2'];

  return (
    <div className="center">
      <div className="card glass slide-up">
        <h2>My Portfolio</h2>
        <h3>Photos</h3>
        <div className="grid">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt="Portfolio" />
          ))}
        </div>
        <h3>Videos</h3>
        <div className="grid">
          {videos.map((video, index) => (
            <video key={index} src={video} controls />
          ))}
        </div>
        <h3>Achievements</h3>
        <ul>
          {achievements.map((ach, index) => (
            <li key={index}>{ach}</li>
          ))}
        </ul>
        <p><Link to="/actor/dashboard">Back to Dashboard</Link></p>
      </div>
    </div>
  );
};

export default Portfolio;