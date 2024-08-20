import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import { Button, Container, Form } from 'react-bootstrap';

const ShoppingSearchPage = () => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    // Implement filtering logic based on `query`
    // Example: If you have a list of items in the state
    const allItems = ['Apples', 'Oranges', 'Bananas']; // Replace with actual items source
    const results = allItems.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
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
      <ShoppingList items={filteredItems} />
      <Button variant="primary" className="mt-4" onClick={() => navigate('/shared')}>
        Go to Shared Lists
      </Button>
    </Container>
  );
};

export default ShoppingSearchPage;

