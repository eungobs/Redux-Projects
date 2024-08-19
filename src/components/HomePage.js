 import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 
import shopinglistimage from '../images/shopinglistimage.png'; // Import the image

const HomePage = () => {
  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(${shopinglistimage})` }} // Inline style for background image
    >
      <h1>Welcome to the Shopping List App</h1>
      <p>Your one-stop solution for managing your shopping lists.</p>
      <div className="homepage-buttons">
        <Link to="/shopping" className="btn btn-primary">Go to Shopping List</Link>
        <Link to="/share" className="btn btn-secondary">Share a List</Link>
      </div>
    </div>
  );
};

export default HomePage;

