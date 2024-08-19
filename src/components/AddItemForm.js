import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/items/itemSlice';
import { Button, Form } from 'react-bootstrap';

// Define categories here or import them if they are defined elsewhere
const categories = ['Vegetables', 'Cleaning Products', 'Cosmetics', 'Clothes', 'Hardware'];

const AddItemForm = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState({ name: '', quantity: '', notes: '', category: 'Vegetables' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name && item.quantity) {
      dispatch(addItem(item));
      setItem({ name: '', quantity: '', notes: '', category: 'Vegetables' });
    } else {
      alert("Please enter both item name and quantity");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Item Name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Quantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Notes"
          value={item.notes}
          onChange={(e) => setItem({ ...item, notes: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
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
      <Button variant="success" type="submit">Add Item</Button>
    </Form>
  );
};

export default AddItemForm;
