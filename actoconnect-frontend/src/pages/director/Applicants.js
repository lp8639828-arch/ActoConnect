import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ProfileCard from '../../components/cards/ProfileCard';
import Button from '../../components/ui/Button';
import { getApplicationsByAudition, updateApplicationStatus, getAudition } from '../../services/userService';

const Applicants = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auditionId = searchParams.get('auditionId');
  const user = JSON.parse(localStorage.getItem('user')) || {};
  
  const [applications, setApplications] = useState([]);
  const [audition, setAudition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user._id || user.role !== 'director') {
      navigate('/login');
      return;
    }
    if (auditionId) {
      fetchApplications();
    } else {
      // If no auditionId, show message to select an audition
      setLoading(false);
    }
  }, [auditionId]);

  const fetchApplications = async () => {
    try {
      const [appsResponse, auditionResponse] = await Promise.all([
        getApplicationsByAudition(auditionId),
        getAudition(auditionId)
      ]);
      setApplications(appsResponse.data);
      setAudition(auditionResponse.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setMessage('Error loading applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      setMessage(`Application ${status.toLowerCase()} successfully`);
      // Refresh applications
      const response = await getApplicationsByAudition(auditionId);
      setApplications(response.data);
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage('Error updating application status');
    }
  };

  const handleShortlist = (id) => {
    handleStatusChange(id, 'Shortlisted');
  };

  const handleReject = (id) => {
    handleStatusChange(id, 'Rejected');
  };

  if (loading) return <div className="center">Loading...</div>;

  if (!auditionId) {
    return (
      <div className="center">
        <div className="card glass">
          <h2>No Audition Selected</h2>
          <p>Please select an audition from your dashboard to view applications.</p>
          <Link to="/director/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div className="card glass">
        <h2>Applications for: {audition?.title || 'Audition'}</h2>
        <p>Role: {audition?.role}</p>
        {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
      </div>
      {applications.length === 0 ? (
        <div className="card glass">
          <p>No applications yet for this audition.</p>
        </div>
      ) : (
        <div className="grid">
          {applications.map(app => {
            const actor = app.actorId || app;
            return (
              <div key={app._id} className="profile-card glass">
                <ProfileCard
                  name={actor.name}
                  role={actor.gender || 'Actor'}
                  image={actor.photo || 'https://via.placeholder.com/150'}
                  city={actor.city || 'N/A'}
                  skills={actor.skills || []}
                />
                <p><strong>Status:</strong> <span className={`status-badge ${app.status.toLowerCase()}`}>{app.status}</span></p>
                {app.status === 'Applied' && (
                  <>
                    <Button onClick={() => handleShortlist(app._id)} className="btn-success">Shortlist</Button>
                    <Button onClick={() => handleReject(app._id)} className="btn-danger">Reject</Button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
      <p><Link to="/director/dashboard">Back to Dashboard</Link></p>
    </div>
  );
};

export default Applicants;