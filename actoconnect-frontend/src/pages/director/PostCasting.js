import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const PostCasting = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  const handlePost = () => {
    // Handle post logic
    console.log('Post casting:', title, description, requirements);
  };

  return (
    <div className="center">
      <div className="card glass">
        <h2>Post Casting Call</h2>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <Input
          placeholder="Requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
        <Button onClick={handlePost}>Post</Button>
        <p><Link to="/director/dashboard">Back to Dashboard</Link></p>
      </div>
    </div>
  );
};

export default PostCasting;