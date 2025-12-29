import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { getDirectors } from '../services/userService';

const Directors = () => {
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [directors, setDirectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('name', searchTerm);
        if (genreFilter) params.append('genre', genreFilter);
        if (cityFilter) params.append('city', cityFilter);
        const response = await getDirectors(params.toString());
        setDirectors(response.data);
      } catch (error) {
        console.error('Error fetching directors:', error);
      }
    };
    fetchDirectors();
  }, [searchTerm, genreFilter, cityFilter]);

  const openModal = (director) => {
    setSelectedDirector(director);
  };

  const closeModal = () => {
    setSelectedDirector(null);
  };

  return (
    <div className="directors-page">
      <div className="container">
        <section className="page-hero">
          <div className="hero-card">
            <h1>Find Directors</h1>
            <p>Connect with visionary directors shaping Indian cinema</p>
            <Link to="/register">
              <Button className="btn btn-primary">Join as Director</Button>
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
                placeholder="Filter by genre..."
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
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

        <section className="directors-section">
          <div className="content-card">
            <h2>Featured Directors</h2>
            <div className="directors-grid">
              {directors.map(director => (
                <div key={director._id} className="director-card">
                  <div className="director-image">
                    <img src={director.photo || '/default-avatar.png'} alt={director.name} />
                  </div>
                  <div className="director-info">
                    <h3>{director.name}</h3>
                    <div className="director-genre">
                      {director.genre && <span className="genre-tag">{director.genre}</span>}
                    </div>
                    <Button
                      className="btn btn-secondary"
                      onClick={() => openModal(director)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Profile Modal */}
      {selectedDirector && (
        <div className="profile-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-header">
              <img src={selectedDirector.photo || '/default-avatar.png'} alt={selectedDirector.name} className="modal-image" />
              <div className="modal-info">
                <h2>{selectedDirector.name}</h2>
              </div>
            </div>
            <div className="modal-body">
              <h3>Bio</h3>
              <p className="modal-bio">{selectedDirector.bio || 'No bio available'}</p>
              <h3>Company</h3>
              <p className="modal-company">{selectedDirector.company || 'No company info'}</p>
              <h3>Genre</h3>
              <p className="modal-genre">{selectedDirector.genre || 'No genre info'}</p>
              <h3>Past Projects</h3>
              <div className="modal-projects">
                {selectedDirector.pastProjects && selectedDirector.pastProjects.map(project => (
                  <span key={project} className="project-tag">{project}</span>
                ))}
              </div>
              <h3>Experience</h3>
              <p className="modal-experience">{selectedDirector.experience || 'No experience info'}</p>
              <h3>Phone</h3>
              <p className="modal-phone">{selectedDirector.phone || 'No phone number'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Directors;