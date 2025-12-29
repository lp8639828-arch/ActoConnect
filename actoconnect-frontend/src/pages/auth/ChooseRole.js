import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import DialogCard from '../../components/cards/DialogCard';

const ChooseRole = () => {
  return (
    <div className="hero">
      <div className="center">
        <div className="card glass-card fade-in">
          <h1>Welcome to ActoConnect</h1>
          <p>Choose your role to get started</p>
          <div className="role-buttons">
            <Link to="/login">
              <Button className="glow">I'm an Actor</Button>
            </Link>
            <Link to="/login">
              <Button className="glow">I'm a Casting Director</Button>
            </Link>
          </div>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
      <DialogCard />
    </div>
  );
};

export default ChooseRole;