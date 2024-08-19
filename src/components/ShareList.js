import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function ShareList() {
  const items = useSelector((state) => state.items.items);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleShare = () => {
    const listContent = items
      .map((item) => `${item.name} - ${item.quantity} - Category: ${item.category}`)
      .join('\n');

    // Assuming you have an endpoint set up to handle email sending
    axios.post('http://localhost:5000/send-email', {
      to: email,
      subject: 'Shared Shopping List',
      text: listContent,
    })
    .then(() => {
      setMessage('List successfully shared!');
      setEmail('');
    })
    .catch(() => {
      setMessage('Failed to share the list.');
    });
  };

  return (
    <div>
      <h2>Shared Shopping List</h2>
      <ListGroup>
        {items.length > 0 ? (
          items.map((item) => (
            <ListGroupItem key={item.id}>
              <strong>{item.name}</strong> - {item.quantity} - <em>Category: {item.category}</em>
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>No items to display.</ListGroupItem>
        )}
      </ListGroup>
      <Form className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Recipient Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleShare}>
          Share List
        </Button>
      </Form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default ShareList;
