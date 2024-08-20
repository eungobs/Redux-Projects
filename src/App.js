import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './components/HomePage';
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';
import EditItem from './components/EditItem';
import ShareList from './components/ShareList';
import SearchBar from './components/SearchBar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage'; // Import RegisterPage component

function App() {
  const [isRegisterOpen, setRegisterOpen] = useState(false); // State to manage registration popup visibility
  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState([
    'Apples',
    'Oranges',
    'Bananas',
    // more items
  ]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const openRegister = () => {
    setRegisterOpen(true);
  };

  const closeRegister = () => {
    setRegisterOpen(false);
  };

  const handleSearch = (query) => {
    const filteredItems = items.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    console.log('Search results:', filteredItems);
    // Update your state or display the filtered items as needed
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
        </Routes>
        {isRegisterOpen && <RegisterPage onClose={closeRegister} />}
      </div>
    </Router>
  );
}

export default App;

