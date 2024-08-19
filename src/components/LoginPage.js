import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/items/authSlice'; // Import loginSuccess action
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWhatsapp,
  faXTwitter as faX, // Twitter is now X
  faTiktok,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Correct import
import './LoginPage.css'; // Ensure to import your CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(loginSuccess()); // Simulate successful login
      navigate('/shopping'); // Redirect to shopping page
    }, 2000); // Simulate a 2-second loading time
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div className="social-icons">
        <FontAwesomeIcon icon={faWhatsapp} size="2x" className="social-icon" />
        <FontAwesomeIcon icon={faX} size="2x" className="social-icon" />
        <FontAwesomeIcon icon={faTiktok} size="2x" className="social-icon" />
        <FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon" />
        <FontAwesomeIcon icon={faEnvelope} size="2x" className="social-icon" />
      </div>
    </div>
  );
};

export default LoginPage;

