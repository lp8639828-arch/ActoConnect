import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCard from '../../components/cards/ProfileCard';

const ExploreActors = () => {
  const actors = [
    { id: 1, name: 'John Doe', role: 'Actor', image: 'https://via.placeholder.com/150/001122/ffffff?text=Actor+1', city: 'Mumbai', skills: ['Drama', 'Comedy'] },
    { id: 2, name: 'Jane Smith', role: 'Actress', image: 'https://via.placeholder.com/150/001122/ffffff?text=Actor+2', city: 'Delhi', skills: ['Action', 'Romance'] },
    // Add more actors
  ];

  const handleFollow = (id) => {
    console.log('Follow actor:', id);
  };

  return (
    <div className="center">
      <div className="grid">
        {actors.map(actor => (
          <ProfileCard
            key={actor.id}
            name={actor.name}
            role={actor.role}
            image={actor.image}
            city={actor.city}
            skills={actor.skills}
            onFollow={() => handleFollow(actor.id)}
          />
        ))}
      </div>
      <p><Link to="/actor/dashboard">Back to Dashboard</Link></p>
    </div>
  );
};

export default ExploreActors;