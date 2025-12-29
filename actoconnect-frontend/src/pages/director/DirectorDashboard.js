import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import SwipeSection from '../../components/SwipeSection';
import MediaCard from '../../components/MediaCard';
import DialogCarousel from '../../components/DialogCarousel';
import { getAuditions, getApplicationsByAudition, getActors } from '../../services/userService';

const DirectorDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [studioStats, setStudioStats] = useState([
    { value: '0', label: 'Active Projects' },
    { value: '0', label: 'Total Applicants' },
    { value: '0%', label: 'Success Rate' },
    { value: '0', label: 'Cast This Month' }
  ]);
  const [trendingTalent, setTrendingTalent] = useState([]);
  const [smartMatches, setSmartMatches] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch director's auditions
        const auditionsResponse = await getAuditions();
        const directorAuditions = auditionsResponse.data.filter(a => 
          a.directorId?._id === user._id || a.directorId === user._id
        );

        // Calculate stats
        let totalApplicants = 0;
        let shortlistedCount = 0;
        for (const audition of directorAuditions) {
          try {
            const appsResponse = await getApplicationsByAudition(audition._id);
            totalApplicants += appsResponse.data.length;
            shortlistedCount += appsResponse.data.filter(app => app.status === 'Shortlisted').length;
          } catch (error) {
            console.error('Error fetching applications:', error);
          }
        }

        const activeProjects = directorAuditions.filter(a => a.status === 'Open').length;
        const successRate = totalApplicants > 0 ? Math.round((shortlistedCount / totalApplicants) * 100) : 0;

        setStudioStats([
          { value: activeProjects.toString(), label: 'Active Projects' },
          { value: totalApplicants.toString(), label: 'Total Applicants' },
          { value: `${successRate}%`, label: 'Success Rate' },
          { value: shortlistedCount.toString(), label: 'Shortlisted' }
        ]);

        // Fetch trending talent (top actors)
        const actorsResponse = await getActors();
        const topActors = actorsResponse.data.slice(0, 3).map(actor => ({
          image: actor.photo || 'https://via.placeholder.com/300x200/08121E/00F5D4?text=Actor',
          title: actor.name,
          description: `${actor.skills?.join(', ') || 'Talented actor'} - ${actor.city || ''}`
        }));
        setTrendingTalent(topActors);

        // Smart matches could be based on recent auditions
        if (directorAuditions.length > 0) {
          const latestAudition = directorAuditions[0];
          setSmartMatches([{
            image: 'https://via.placeholder.com/300x200/08121E/00F5D4?text=Match',
            title: `For: ${latestAudition.role}`,
            description: `Find perfect match for ${latestAudition.title}`
          }]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (user._id) {
      fetchDashboardData();
    }
  }, [user._id]);

  return (
    <div className="dashboard-container">
      <div className="stats-grid">
        {studioStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <SwipeSection title="Trending Talent">
        {trendingTalent.map((talent, index) => (
          <MediaCard
            key={index}
            image={talent.image}
            title={talent.title}
            description={talent.description}
            onClick={() => navigate('/actors')}
          />
        ))}
      </SwipeSection>

      <SwipeSection title="Smart Matches">
        {smartMatches.map((match, index) => (
          <MediaCard
            key={index}
            image={match.image}
            title={match.title}
            description={match.description}
            onClick={() => navigate('/director/post-audition')}
          />
        ))}
      </SwipeSection>

      <div className="dashboard-actions">
        <Link to="/director/post-audition">
          <Button className="ripple-btn btn-primary">Post New Audition</Button>
        </Link>
        <Link to="/director/applicants">
          <Button className="ripple-btn btn-accent">Review Applicants</Button>
        </Link>
      </div>

      <DialogCarousel />
    </div>
  );
};

export default DirectorDashboard;