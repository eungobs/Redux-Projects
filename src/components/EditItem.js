import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editItem, fetchItems } from '../features/items/itemSlice';
import { Button, Form, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const items = useSelector((state) => state.items.items);
  const item = items.find((item) => item.id === id);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setNotes(item.notes);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editItem(id, { name, quantity, notes }));
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
        <Button variant="warning" type="submit">Update Item</Button>
      </Form>
    </Container>
  );
};

export default EditItem;
