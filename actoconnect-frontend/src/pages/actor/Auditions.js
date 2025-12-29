import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuditionCard from '../../components/cards/AuditionCard';
import { applyForAudition, getApplications, getAuditions } from '../../services/userService';

const Auditions = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const actorId = user._id;

  const [applications, setApplications] = useState([]);
  const [auditions, setAuditions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actorId) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [actorId]);

  const fetchData = async () => {
    try {
      const [appsResponse, audsResponse] = await Promise.all([
        getApplications(actorId),
        getAuditions()
      ]);
      setApplications(appsResponse.data);
      setAuditions(audsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (auditionId) => {
    if (!actorId) {
      alert('Please login to apply');
      return;
    }
    try {
      await applyForAudition({ auditionId, actorId });
      alert('Applied successfully!');
      // Refresh applications
      const response = await getApplications(actorId);
      setApplications(response.data);
    } catch (error) {
      console.error('Error applying:', error);
      alert(error.response?.data?.message || 'Error applying to audition');
    }
  };

  const getApplicationStatus = (auditionId) => {
    const app = applications.find(a => a.auditionId === auditionId.toString() || a.auditionId === auditionId);
    return app ? app.status : null;
  };

  if (loading) return <div className="center">Loading...</div>;

  return (
    <div className="center">
      <h2>My Applications</h2>
      <div className="applications-list">
        {applications.length === 0 ? (
          <p>No applications yet. Apply to auditions below!</p>
        ) : (
          applications.map(app => {
            const audition = auditions.find(a => 
              (a._id && a._id.toString() === app.auditionId) || 
              (a.id && a.id.toString() === app.auditionId) ||
              (app.auditionId && typeof app.auditionId === 'string' && app.auditionId === a._id?.toString())
            );
            return (
              <div key={app._id} className="application-item">
                <h3>{audition ? audition.title : `Audition ${app.auditionId}`}</h3>
                <span className={`status-badge ${app.status.toLowerCase()}`}>{app.status}</span>
              </div>
            );
          })
        )}
      </div>
      <h2>Available Auditions</h2>
      <div className="grid">
        {auditions.length === 0 ? (
          <p>No auditions available at the moment.</p>
        ) : (
          auditions.map(aud => (
            <AuditionCard
              key={aud._id || aud.id}
              title={aud.title}
              ageRange={aud.ageRange || aud.requirements?.find(req => req.includes('Age')) || '18-40'}
              city={aud.city || aud.location}
              description={aud.description}
              lastDate={aud.deadline}
              status={aud.status}
              applicationStatus={getApplicationStatus(aud._id || aud.id)}
              onApply={() => handleApply(aud._id || aud.id)}
            />
          ))
        )}
      </div>
      <p><Link to="/actor/dashboard">Back to Dashboard</Link></p>
    </div>
  );
};

export default Auditions;