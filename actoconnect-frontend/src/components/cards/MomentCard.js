import React from 'react';
import './MomentCard.css';

const MomentCard = ({ actor, quote }) => {
  return (
    <div className="moment-card">
      <div className="moment-content">
        <blockquote className="moment-quote">
          "{quote}"
        </blockquote>
        <cite className="actor-name">— {actor}</cite>
      </div>
      <div className="moment-decoration">
        <span className="film-icon">🎬</span>
      </div>
    </div>
  );
};

export default MomentCard;