import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { loginUser } from '../../services/userService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('actor');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      setSuccess('Login successful!');
      setError('');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      // Navigate to appropriate dashboard based on role
      const userRole = response.data.user.role;
      if (userRole === 'actor') {
        navigate('/actor/dashboard');
      } else if (userRole === 'director') {
        navigate('/director/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data || 'Login failed');
      setSuccess('');
    }
  };

  return (
    <div className="center">
      <div className="card glass-card fade-in">
        <h2>Login</h2>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="input">
          <option value="actor">Actor</option>
          <option value="director">Casting Director</option>
        </select>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <Button className="ripple-btn" onClick={handleLogin}>Login</Button>
        <p><Link to="/forgot">Forgot Password?</Link></p>
        <p><Link to="/register">Register</Link> | <Link to="/">Back</Link></p>
      </div>
    </div>
  );
};

export default Login;