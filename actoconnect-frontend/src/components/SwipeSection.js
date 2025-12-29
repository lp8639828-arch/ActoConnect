import React from 'react';

const SwipeSection = ({ title, children }) => {
  return (
    <div className="swipe-section">
      <h2 className="section-title">{title}</h2>
      <div className="swipe-row">
        {children}
      </div>
    </div>
  );
};

export default SwipeSection;