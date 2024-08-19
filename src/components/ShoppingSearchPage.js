import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import { Button, Container } from 'react-bootstrap';

const ShoppingSearchPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Shopping and Search</h1>
      <ShoppingList />
      <Button variant="primary" className="mt-4" onClick={() => navigate('/shared')}>
        Go to Shared Lists
      </Button>
    </Container>
  );
};

export default ShoppingSearchPage;
