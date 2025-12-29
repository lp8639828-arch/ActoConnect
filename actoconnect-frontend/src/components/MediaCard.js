import React from 'react';

const MediaCard = ({ image, title, description, onClick }) => {
  return (
    <div className="swipe-card media-card" onClick={onClick}>
      <img src={image} alt={title} />
      <div className="media-overlay">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default MediaCard;