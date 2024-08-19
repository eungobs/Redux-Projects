import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/items/itemSlice';
import { Button, Form } from 'react-bootstrap';

const AddItemForm = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState({ name: '', quantity: '', notes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name && item.quantity) {
      dispatch(addItem(item));
      setItem({ name: '', quantity: '', notes: '' });
    } else {
      alert("Please enter both item name and quantity");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          placeholder="Item Name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
        <Form.Control
          placeholder="Quantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        />
        <Form.Control
          placeholder="Notes"
          value={item.notes}
          onChange={(e) => setItem({ ...item, notes: e.target.value })}
        />
        <Button variant="success" type="submit">Add Item</Button>
      </Form.Group>
    </Form>
  );
};

export default AddItemForm;
