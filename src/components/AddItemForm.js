import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/items/itemSlice';
import { Button, Form, Col, Row } from 'react-bootstrap';

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

const AddItemForm = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    name: '',
    quantity: '',
    notes: '',
    category: 'Vegetables',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name && item.quantity) {
      dispatch(addItem(item));
      setItem({ name: '', quantity: '', notes: '', category: 'Vegetables', date: '' });
    } else {
      alert("Please enter both item name and quantity");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add New Item</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                placeholder="Enter item name"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                placeholder="Enter quantity"
                value={item.quantity}
                onChange={(e) => setItem({ ...item, quantity: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add any notes"
                value={item.notes}
                onChange={(e) => setItem({ ...item, notes: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={item.category}
                onChange={(e) => setItem({ ...item, category: e.target.value })}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={item.date}
                onChange={(e) => setItem({ ...item, date: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="success" type="submit">Add Item</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddItemForm;
