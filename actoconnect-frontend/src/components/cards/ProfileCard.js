import React from 'react';

const ProfileCard = ({ name, role, image, city, skills, onFollow }) => {
  return (
    <div className="profile-card glass glow">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      <p>{city}</p>
      <div>
        {skills.map(skill => (
          <span key={skill} className="badge">{skill}</span>
        ))}
      </div>
      <button className="btn ripple-btn" onClick={onFollow}>Follow</button>
    </div>
  );
};

export default ProfileCard;