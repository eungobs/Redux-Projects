import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './components/HomePage';
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';
import EditItem from './components/EditItem';
import ShareList from './components/ShareList';
import SearchBar from './components/SearchBar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PrivacyPage from './components/PrivacyPage'; // Import PrivacyPage component

const CookiesPopup = ({ onAccept }) => {
  const navigate = useNavigate(); // Use useNavigate within the component

  const handleReadMore = () => {
    navigate('/privacy'); // Navigate to privacy page
  };

  return (
    <div className="cookies-popup">
      <p>
        We use cookies to ensure you get the best experience on our website.
        <button onClick={handleReadMore} className="btn btn-link">Read More</button>
      </p>
      <button onClick={onAccept} className="btn btn-accept">
        Accept
      </button>
    </div>
  );
};

function App() {
  const [isRegisterOpen, setRegisterOpen] = useState(false); // State to manage registration popup visibility
  const [cookiesAccepted, setCookiesAccepted] = useState(false); // State to manage cookies popup visibility
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const openRegister = () => {
    setRegisterOpen(true);
  };

  const closeRegister = () => {
    setRegisterOpen(false);
  };

  const handleSearch = (query) => {
    // Handle search functionality
    console.log('Search query:', query);
  };

  const handleAcceptCookies = () => {
    setCookiesAccepted(true); // Hide the cookies popup
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <SearchBar onSearch={handleSearch} />}
        <Routes>
          <Route path="/" element={<HomePage onRegister={openRegister} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage onClose={closeRegister} />} />
          <Route path="/shopping" element={<PrivateRoute element={<ShoppingList />} />} />
          <Route path="/add" element={<PrivateRoute element={<AddItemForm />} />} />
          <Route path="/edit/:id" element={<PrivateRoute element={<EditItem />} />} />
          <Route path="/share" element={<PrivateRoute element={<ShareList />} />} />
          <Route path="/privacy" element={<PrivacyPage />} /> {/* Add PrivacyPage route */}
        </Routes>
        {isRegisterOpen && <RegisterPage onClose={closeRegister} />}
        {!cookiesAccepted && <CookiesPopup onAccept={handleAcceptCookies} />}
      </div>
    </Router>
  );
}

export default App;



