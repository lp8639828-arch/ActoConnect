import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProfileCard from '../components/cards/ProfileCard';
import { getActors, followUser } from '../services/userService';

const Actors = () => {
  const [selectedActor, setSelectedActor] = useState(null);
  const [actors, setActors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('name', searchTerm);
        if (skillFilter) params.append('skill', skillFilter);
        if (cityFilter) params.append('city', cityFilter);
        const response = await getActors(params.toString());
        setActors(response.data);
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };
    fetchActors();
  }, [searchTerm, skillFilter, cityFilter]);

  const openModal = (actor) => {
    setSelectedActor(actor);
  };

  const closeModal = () => {
    setSelectedActor(null);
  };

  const handleFollow = async (actorId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user')) || null;
      if (!user || !user._id) {
        alert('Please login to follow actors');
        return;
      }
      await followUser(actorId, user._id);
      alert('Followed successfully!');
    } catch (error) {
      console.error('Error following:', error);
      alert(error.response?.data?.message || 'Error following actor');
    }
  };

  return (
    <div className="actors-page">
      <div className="container">
        <section className="page-hero">
          <div className="hero-card">
            <h1>Discover Talent</h1>
            <p>Connect with India's most promising actors</p>
            <Link to="/register">
              <Button className="btn btn-primary">Join as Actor</Button>
            </Link>
          </div>
        </section>

        <section className="search-filters">
          <div className="content-card">
            <div className="filters-row">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <input
                type="text"
                placeholder="Filter by skill..."
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="filter-input"
              />
              <input
                type="text"
                placeholder="Filter by city..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
        </section>

        <section className="actors-section">
          <div className="content-card">
            <h2>Featured Actors</h2>
            <div className="actors-grid">
              {actors.map(actor => (
                <ProfileCard
                  key={actor._id}
                  name={actor.name}
                  role={actor.role}
                  image={actor.photo || '/default-avatar.png'}
                  city={actor.city}
                  skills={actor.skills || []}
                  onFollow={() => handleFollow(actor._id)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Profile Modal */}
      {selectedActor && (
        <div className="profile-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-header">
              <img src={selectedActor.photo || '/default-avatar.png'} alt={selectedActor.name} className="modal-image" />
              <div className="modal-info">
                <h2>{selectedActor.name}</h2>
              </div>
            </div>
            <div className="modal-body">
              <h3>Bio</h3>
              <p className="modal-bio">{selectedActor.bio || 'No bio available'}</p>
              <h3>Experience</h3>
              <p className="modal-experience">{selectedActor.experience || 'No experience info'}</p>
              <h3>Phone</h3>
              <p className="modal-phone">{selectedActor.phone || 'No phone number'}</p>
              <h3>Skills</h3>
              <div className="modal-skills">
                {selectedActor.skills && selectedActor.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actors;