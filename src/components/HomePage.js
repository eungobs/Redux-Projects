import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp,
  faTwitter,
  faTiktok,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import './HomePage.css';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loginError } = useSelector((state) => state.auth);

  const handleNavigation = (path) => {
    if (!isAuthenticated) {
      dispatch({ type: 'auth/loginFailure', payload: 'You must be logged in to access this page.' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 2000); // Simulate a 2-second loading time
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="homepage">
      <div
        className="homepage-image"
        style={{
          backgroundImage: `url('/images/shopinglistimage.png')`,
        }}
      />
      <div className="homepage-text">
        <h1>Welcome to the Shopping List Helper</h1>
        <p>Your one-stop solution for managing your shopping lists.</p>

        {loading ? (
          <div className="loader">
            <FontAwesomeIcon icon={faShoppingCart} spin size="3x" />
            <p>Loading...</p>
          </div>
        ) : (
          <div className="homepage-buttons">
            <button
              onClick={() => handleNavigation('/shopping')}
              className="btn btn-primary"
            >
              Go to Shopping List
            </button>
            <button
              onClick={() => handleNavigation('/share')}
              className="btn btn-secondary"
            >
              Share a List
            </button>
            <button
              onClick={handleRegisterClick}
              className="btn btn-register"
            >
              Register
            </button>
          </div>
        )}

        {/* Display Login Error */}
        {loginError && (
          <div className="login-error" onClick={handleLoginClick}>
            <p>{loginError}. Click here to log in.</p>
          </div>
        )}
      </div>
      <div className="social-icons">
        <FontAwesomeIcon icon={faWhatsapp} size="2x" className="social-icon" />
        <FontAwesomeIcon icon={faTwitter} size="2x" className="social-icon" />
        <FontAwesomeIcon icon={faTiktok} size="2x" className="social-icon" />
        <FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon" />
        <FontAwesomeIcon icon={faEnvelope} size="2x" className="social-icon" />
      </div>
      <footer className="homepage-footer">
        @2024 Shopping-List-Helper. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
