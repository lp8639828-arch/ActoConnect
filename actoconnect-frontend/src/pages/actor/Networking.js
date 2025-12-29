import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCard from '../../components/cards/ProfileCard';

const Networking = () => {
  const directors = [
    { id: 1, name: 'Director 1', role: 'Casting Director', image: 'https://via.placeholder.com/150', city: 'Mumbai', skills: ['Drama'] },
    { id: 2, name: 'Director 2', role: 'Casting Director', image: 'https://via.placeholder.com/150', city: 'Delhi', skills: ['Comedy'] }
  ];

  const handleFollow = (id) => {
    console.log('Follow director:', id);
  };

  return (
    <div className="center">
      <div className="card glass slide-up">
        <h2>Networking</h2>
        <p>Profile Visits: 200</p>
        <h3>Suggested Connections</h3>
        <div className="grid">
          {directors.map(dir => (
            <ProfileCard
              key={dir.id}
              name={dir.name}
              role={dir.role}
              image={dir.image}
              city={dir.city}
              skills={dir.skills}
              onFollow={() => handleFollow(dir.id)}
            />
          ))}
        </div>
        <p><Link to="/actor/dashboard">Back to Dashboard</Link></p>
      </div>
    </div>
  );
};

export default Networking;