import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import ShoppingList from './ShoppingList';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem, deleteItem } from '../features/items/itemSlice';

const ShoppingSearchPage = () => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const results = items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(results);
  };

  const handleEdit = (item) => {
    // Logic to handle item editing
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const results = items.filter(item => 
      item.category === category || category === 'All'
    );
    setFilteredItems(results);
  };

  return (
    <Container>
      <h1>Shopping and Search</h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search for items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Search
        </Button>
      </Form>
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Filter by Category: {selectedCategory}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {['All', 'Vegetables', 'Cleaning Products', 'Cosmetics', 'Clothes', 'Hardware', 'Fruits', 'Bakery', 'Snacks', 'Beverages', 'Dairy Products', 'Meat', 'Pharmacy', 'Frozen', 'Other'].map(category => (
            <Dropdown.Item key={category} onClick={() => handleCategoryChange(category)}>
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <ShoppingList items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />
      <Button variant="primary" className="mt-4" onClick={() => navigate('/shared')}>
        Go to Shared Lists
      </Button>
    </Container>
  );
};

export default ShoppingSearchPage;


