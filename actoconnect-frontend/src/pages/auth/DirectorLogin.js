import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const DirectorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic
    console.log('Director login:', email, password);
  };

  return (
    <div className="center">
      <div className="card glass fade-in">
        <h2>Director Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="ripple-btn" onClick={handleLogin}>Login</Button>
        <p><Link to="/register">Register</Link> | <Link to="/">Back</Link></p>
      </div>
    </div>
  );
};

export default DirectorLogin;