import React, { useState } from 'react';
import './RegisterPage.css'; // Import the CSS for RegisterPage
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Loader from './Loader'; // Import the Loader component

const RegisterPage = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    gender: '',
    country: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false); // State to manage loader visibility
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show the loader

    // Simulate a network request
    setTimeout(() => {
      console.log(formData);
      setLoading(false); // Hide the loader
      onClose(); // Close the popup
      navigate('/login'); // Redirect to the login page
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <div className="register-overlay">
      <div className="register-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} required />
          <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
      </div>
      {loading && <Loader />} {/* Show loader when loading is true */}
    </div>
  );
};

export default RegisterPage;
