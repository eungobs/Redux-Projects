import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editItem, fetchItems } from '../features/items/itemSlice';
import { Button, Form, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

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

const EditItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const items = useSelector((state) => state.items.items);
  const item = items.find((item) => item.id === id);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('Vegetables'); // Default category

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setNotes(item.notes);
      setCategory(item.category || 'Vegetables'); // Set category if available
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editItem(id, { name, quantity, notes, category }));
    navigate('/');
  };

  return (
    <Container className="bg-dark text-light p-4">
      <h2 className="my-4">Edit Item</h2>
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
        <Button variant="warning" type="submit">Update Item</Button>
      </Form>
    </Container>
  );
};

export default EditItem;
