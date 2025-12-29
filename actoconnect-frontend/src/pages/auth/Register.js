import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { registerUser, loginUser } from '../../services/userService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'actor',
    // Actor fields
    gender: '',
    height: '',
    weight: '',
    skinTone: '',
    skills: '',
    // Director fields
    company: '',
    genre: '',
    pastProjects: '',
    experience: '',
    // Common fields
    city: '',
    bio: '',
    phone: '',
    photo: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
      const pastProjectsArray = formData.pastProjects.split(',').map(p => p.trim()).filter(p => p);
      const userData = { ...formData, skills: skillsArray, pastProjects: pastProjectsArray };
      await registerUser(userData);
      // Auto login
      const loginRes = await loginUser({ email: formData.email, password: formData.password });
      localStorage.setItem('user', JSON.stringify(loginRes.data.user));
      localStorage.setItem('token', loginRes.data.token);
      setSuccess('Registration successful! Redirecting...');
      // Navigate to appropriate dashboard based on role
      const userRole = loginRes.data.user.role;
      setTimeout(() => {
        if (userRole === 'actor') {
          navigate('/actor/dashboard');
        } else if (userRole === 'director') {
          navigate('/director/dashboard');
        } else {
          navigate('/profile');
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="center">
      <div className="card glass-card fade-in">
        <h2>Register</h2>
        <Input
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange} className="input">
          <option value="actor">Actor</option>
          <option value="director">Director</option>
        </select>
        {formData.role === 'actor' && (
          <>
            <select name="gender" value={formData.gender} onChange={handleChange} className="input">
              <option value="">Select Gender</option>
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
            </select>
            <Input
              placeholder="Height"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
            <Input
              placeholder="Weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
            <Input
              placeholder="Skin Tone"
              name="skinTone"
              value={formData.skinTone}
              onChange={handleChange}
            />
            <Input
              placeholder="Skills (comma separated)"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </>
        )}
        {formData.role === 'director' && (
          <>
            <Input
              placeholder="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
            <Input
              placeholder="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
            <Input
              placeholder="Past Projects (comma separated)"
              name="pastProjects"
              value={formData.pastProjects}
              onChange={handleChange}
            />
            <Input
              placeholder="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </>
        )}
        <Input
          placeholder="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <textarea
          placeholder="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="input"
          rows="3"
        />
        <Input
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          placeholder="Photo URL"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <Button onClick={handleRegister}>Register</Button>
        <p><Link to="/">Back to Home</Link></p>
      </div>
    </div>
  );
};

export default Register;