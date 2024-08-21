import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from '../features/items/itemSlice';
import { Button, Form, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Updated categories array
const categories = [
  'Vegetables',
  'Cleaning Products',
  'Cosmetics',
  'Clothes',
  'Hardware',
  'Fruits',
  'Bakery',
  'Snacks',
  'Beverages',
  'Dairy Products',
  'Meat',
  'Pharmacy',
  'Frozen',
  'Other'
];

const AddItem = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('Vegetables'); // Default category

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createItem({ name, quantity, notes, category }));
    history.push('/');
  };

  return (
    <Container className="bg-dark text-light p-4">
      <h2 className="my-4">Add New Item</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">Add Item</Button>
      </Form>
    </Container>
  );
};

export default AddItem;
;
