import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; // Import HomePage component
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';
import EditItem from './components/EditItem';
import ShareList from './components/ShareList';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Router>
      <div className="app-container">
        <SearchBar />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Set HomePage as the default route */}
          <Route path="/shopping" element={<ShoppingList />} />
          <Route path="/add" element={<AddItemForm />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/share" element={<ShareList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;







