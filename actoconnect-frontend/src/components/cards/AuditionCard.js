import React from 'react';
import Button from '../ui/Button';

const AuditionCard = ({ title, ageRange, city, description, lastDate, onApply, status }) => {
  return (
    <div className="audition-card glass">
      <h3>{title}</h3>
      <p>Age: {ageRange}</p>
      <p>City: {city}</p>
      <p>{description}</p>
      <p>Last Date: {lastDate}</p>
      <div className="badge">{status}</div>
      <Button onClick={onApply}>Apply</Button>
    </div>
  );
};

export default AuditionCard;