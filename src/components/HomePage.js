import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 2000); // Simulate a 2-second loading time
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
          </div>
        )}
      </div>
      <footer className="homepage-footer">
        @2024 Shopping-List-Helper. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
