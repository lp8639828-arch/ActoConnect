import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { createAudition } from '../../services/userService';

const PostAudition = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Film');
  const [role, setRole] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [compensation, setCompensation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!user._id) {
      setMessage('Please login first');
      return;
    }

    if (!title || !role || !location || !deadline || !description) {
      setMessage('Please fill all required fields');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const requirementsArray = requirements.split(',').map(r => r.trim()).filter(r => r);
      if (ageRange) {
        requirementsArray.push(`Age ${ageRange}`);
      }
      
      await createAudition({
        title,
        type,
        role,
        directorId: user._id,
        location: location || city,
        city: city || location,
        deadline,
        description,
        requirements: requirementsArray,
        compensation,
        ageRange,
        gender
      });
      setMessage('Audition posted successfully!');
      setTimeout(() => {
        navigate('/director/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error posting audition:', error);
      setMessage(error.response?.data?.message || 'Error posting audition');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="card glass slide-up">
        <h2>Post Audition</h2>
        <Input placeholder="Project Title *" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Input placeholder="Role Title *" value={role} onChange={(e) => setRole(e.target.value)} required />
        <select value={type} onChange={(e) => setType(e.target.value)} className="input">
          <option value="Film">Film</option>
          <option value="Web Series">Web Series</option>
          <option value="TV Series">TV Series</option>
          <option value="Short Film">Short Film</option>
          <option value="Music Video">Music Video</option>
          <option value="Theatre">Theatre</option>
          <option value="Commercial">Commercial</option>
          <option value="Documentary">Documentary</option>
        </select>
        <Input placeholder="Location *" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input placeholder="Age Range (e.g., 25-35)" value={ageRange} onChange={(e) => setAgeRange(e.target.value)} />
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="input">
          <option value="">Select Gender (Optional)</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Any">Any</option>
        </select>
        <textarea placeholder="Description *" value={description} onChange={(e) => setDescription(e.target.value)} className="input" rows="4" required />
        <Input placeholder="Requirements (comma separated)" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
        <Input placeholder="Compensation" value={compensation} onChange={(e) => setCompensation(e.target.value)} />
        <Input type="date" placeholder="Deadline *" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        {message && <p style={{ color: message.includes('Error') || message.includes('Please') ? 'red' : 'green' }}>{message}</p>}
        <Button onClick={handlePost} disabled={loading}>
          {loading ? 'Posting...' : 'Post Audition'}
        </Button>
        <p><Link to="/director/dashboard">Back to Dashboard</Link></p>
      </div>
    </div>
  );
};

export default PostAudition;