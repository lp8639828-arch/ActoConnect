import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import MomentCard from '../components/cards/MomentCard';
import { actors } from '../data/actors';
import { auditions as staticAuditions } from '../data/auditions';
import { getSuccessStories, getAuditions } from '../services/userService';

const Home = () => {
  const [currentMoment, setCurrentMoment] = useState(0);
  const [currentInspiration, setCurrentInspiration] = useState(0);
  const [counters, setCounters] = useState({ actors: 0, castings: 0, stories: 0 });
  const [searchPlaceholder, setSearchPlaceholder] = useState(0);
  const [successStories, setSuccessStories] = useState([]);
  const [auditions, setAuditions] = useState([]);

  const moments = [
    {
      actor: "Shah Rukh Khan",
      quote: "Kehte hain agar kisi cheez ko dil se chaaho to saari kayanat tumhe usse milane ki koshish mein lag jaati hai."
    },
    {
      actor: "Amitabh Bachchan",
      quote: "Talent gets noticed only when given a platform."
    },
    {
      actor: "Rajkumar Rao",
      quote: "Hard work beats luck."
    },
    {
      actor: "Alia Bhatt",
      quote: "Never let your dreams fade."
    }
  ];

  const inspirations = [
    "Dream big, work hard, stay humble. 🌟",
    "Every rejection is a redirection to something better. 💫",
    "Your talent is your superpower. Use it wisely. ⚡",
    "Success is not final, failure is not fatal. 🎭",
    "Chase your dreams, not the competition. 🏃‍♀️"
  ];

  const searchPlaceholders = [
    "Search actors by skills...",
    "Find directors in Mumbai...",
    "Discover talent for your next project...",
    "Connect with Bollywood professionals..."
  ];

  const targets = { actors: 10000, castings: 3200, stories: 850 };

  useEffect(() => {
    // Animate counters
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    const animateCounter = (key) => {
      let current = 0;
      const increment = targets[key] / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          setCounters(prev => ({ ...prev, [key]: targets[key] }));
          clearInterval(timer);
        } else {
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, stepTime);
    };

    animateCounter('actors');
    animateCounter('castings');
    animateCounter('stories');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMoment((prev) => (prev + 1) % moments.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [moments.length]);

  useEffect(() => {
    const inspirationInterval = setInterval(() => {
      setCurrentInspiration((prev) => (prev + 1) % inspirations.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(inspirationInterval);
  }, [inspirations.length]);

  useEffect(() => {
    const searchInterval = setInterval(() => {
      setSearchPlaceholder((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(searchInterval);
  }, [searchPlaceholders.length]);

  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await getSuccessStories();
        setSuccessStories(response.data);
      } catch (error) {
        console.error('Error fetching success stories:', error);
      }
    };
    fetchSuccessStories();
  }, []);

  useEffect(() => {
    const fetchAuditions = async () => {
      try {
        const response = await getAuditions();
        setAuditions(response.data.slice(0, 6)); // Show only first 6
      } catch (error) {
        console.error('Error fetching auditions:', error);
        // Fallback to static data if API fails
        setAuditions(staticAuditions.slice(0, 6));
      }
    };
    fetchAuditions();
  }, []);

  return (
    <div className="home-page">
      {/* Daily Inspiration Banner */}
      <div className="inspiration-banner">
        <div className="inspiration-content">
          <span className="inspiration-icon">💫</span>
          <span className="inspiration-text">{inspirations[currentInspiration]}</span>
          <span className="inspiration-icon">✨</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title fade-slide">Every Star Begins with One Audition.</h1>
          <p className="hero-subtitle">Connect with India's finest talent and directors in the film industry.</p>

          {/* Smart Search Bar */}
          <div className="hero-search">
            <div className="search-container">
              <input
                type="text"
                placeholder={searchPlaceholders[searchPlaceholder]}
                className="search-input"
              />
              <button className="search-button">
                <span className="search-icon">🔍</span>
                Search
              </button>
            </div>
          </div>

          <div className="hero-buttons">
            <Link to="/actors">
              <Button className="btn btn-primary">Find Talent</Button>
            </Link>
            <Link to="/directors">
              <Button className="btn btn-secondary">Post Audition</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Auditions Strip */}
      <section className="trending-auditions-section">
        <div className="container">
          <h2 className="section-title">Trending Auditions</h2>
          <div className="trending-strip">
            {(auditions.length > 0 ? auditions : staticAuditions.slice(0, 6)).map((audition, index) => (
              <div key={audition._id || audition.id || index} className="audition-card">
                <div className="audition-info">
                  <h4>{audition.role}</h4>
                  <p className="audition-title">{audition.title}</p>
                  <span className="audition-location">📍 {audition.city || audition.location}</span>
                  <span className="audition-age">
                    👤 {audition.ageRange || audition.requirements?.find(req => req.includes('Age')) || 'Age 18-40'}
                  </span>
                  <span className="audition-director">🎬 {audition.directorId?.name || audition.director || 'Director'}</span>
                </div>
                <Link to="/actor/auditions">
                  <Button className="btn btn-primary btn-small">Apply Now</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="achievements-section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-number">{counters.actors.toLocaleString()}+</div>
              <div className="achievement-label">Actors</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">{counters.castings.toLocaleString()}+</div>
              <div className="achievement-label">Castings</div>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">{counters.stories.toLocaleString()}+</div>
              <div className="achievement-label">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories-section">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          <div className="stories-grid">
            {successStories.map(story => (
              <div key={story._id} className="story-card">
                <img src={story.photo || '/default-avatar.png'} alt={story.actorName} className="story-image" />
                <h3>{story.actorName}</h3>
                <p>{story.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Famous Film Moments Wall */}
      <section className="dialog-section">
        <div className="container">
          <h2 className="section-title">Famous Film Moments</h2>
          <div className="moments-carousel">
            <MomentCard
              actor={moments[currentMoment].actor}
              quote={moments[currentMoment].quote}
            />
            <div className="carousel-dots">
              {moments.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentMoment ? 'active' : ''}`}
                  onClick={() => setCurrentMoment(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;