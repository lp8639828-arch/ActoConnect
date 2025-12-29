import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { uploadResume, getUserProfile } from '../../services/userService';
import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userId = user._id;

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [city, setCity] = useState('');
  const [skills, setSkills] = useState('');
  const [languages, setLanguages] = useState('');
  const [experience, setExperience] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreview, setResumePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userId) {
      loadProfile();
    } else {
      navigate('/login');
    }
  }, [userId]);

  const loadProfile = async () => {
    try {
      const response = await getUserProfile(userId);
      const profile = response.data;
      setName(profile.name || '');
      setBio(profile.bio || '');
      setHeight(profile.height || '');
      setWeight(profile.weight || '');
      setCity(profile.city || '');
      setSkills(profile.skills ? profile.skills.join(', ') : '');
      setGender(profile.gender || '');
      setSkinTone(profile.skinTone || '');
      setPhone(profile.phone || '');
      setPhoto(profile.photo || '');
      setProfileCompletion(profile.profileCompletion || 0);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCompletion = () => {
    const fields = [name, bio, city, skills, height, weight, gender];
    const filled = fields.filter(f => f && f.trim() !== '').length;
    const percent = Math.round((filled / fields.length) * 100);
    setProfileCompletion(percent);
    return percent;
  };

  const handleSave = async () => {
    try {
      const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
      const updateData = {
        name,
        bio,
        height,
        weight,
        city,
        skills: skillsArray,
        gender,
        skinTone,
        phone,
        photo
      };
      await API.put(`/users/${userId}`, updateData);
      setMessage('Profile updated successfully!');
      calculateCompletion();
      // Reload profile to get updated completion
      await loadProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage('Error updating profile');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    if (file) {
      setResumePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadResume = async () => {
    if (resumeFile && userId) {
      try {
        await uploadResume(userId, resumeFile);
        setMessage('Resume uploaded successfully!');
      } catch (error) {
        console.error('Error uploading resume:', error);
        setMessage('Error uploading resume');
      }
    }
  };

  if (loading) return <div className="center">Loading...</div>;

  return (
    <div className="center">
      <div className="card glass-card slide-up">
        <h2>My Profile</h2>
        <div className="profile-completion">
          <div className="progress-circle">
            <svg width="100" height="100">
              <circle cx="50" cy="50" r="40" stroke="#e0e0e0" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#4CAF50"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - profileCompletion / 100)}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="progress-text">{profileCompletion}%</div>
          </div>
          {profileCompletion >= 80 && <div className="verified-badge">⭐ Verified</div>}
        </div>
        <img src={photo || "https://via.placeholder.com/150"} alt="Profile" />
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} className="input" />
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="input">
          <option value="">Select Gender</option>
          <option value="Boy">Boy</option>
          <option value="Girl">Girl</option>
        </select>
        <Input placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
        <Input placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <Input placeholder="Skin Tone" value={skinTone} onChange={(e) => setSkinTone(e.target.value)} />
        <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Input placeholder="Photo URL" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        <Input placeholder="Skills (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} />
        {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        <div className="resume-upload">
          <h3>Portfolio / Resume</h3>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
          {resumePreview && (
            <div className="resume-preview">
              {resumeFile.type.startsWith('image/') ? (
                <img src={resumePreview} alt="Resume preview" style={{ maxWidth: '200px' }} />
              ) : (
                <p>PDF uploaded: {resumeFile.name}</p>
              )}
            </div>
          )}
          <Button onClick={handleUploadResume}>Upload Resume</Button>
        </div>
        <Button onClick={handleSave}>Save</Button>
        <p><Link to="/actor/dashboard">Back to Dashboard</Link></p>
      </div>
    </div>
  );
};

export default Profile;