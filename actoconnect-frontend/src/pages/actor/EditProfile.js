import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');

  const handleSave = () => {
    // Handle save logic
    console.log('Save profile:', name, bio, experience);
  };

  return (
    <div className="center">
      <div className="card glass">
        <h2>Edit Profile</h2>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="input"
        />
        <Input
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <Button onClick={handleSave}>Save</Button>
        <p><Link to="/actor/dashboard">Back to Dashboard</Link></p>
      </div>
    </div>
  );
};

export default EditProfile;