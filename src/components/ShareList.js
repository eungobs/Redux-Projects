import React from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

function ShareList() {
  const items = useSelector((state) => state.items.items);

  const handleShare = () => {
    const listContent = items.map((item) => `${item.name} - ${item.quantity}`).join('\n');
    navigator.clipboard.writeText(listContent).then(() => {
      alert('List copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy list:', err);
    });
  };

  return (
    <div>
      <h2>Shared Shopping List</h2>
      <ListGroup>
        {items.length > 0 ? (
          items.map((item) => (
            <ListGroupItem key={item.id}>
              <strong>{item.name}</strong> - {item.quantity}
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>No items to display.</ListGroupItem>
        )}
      </ListGroup>
      <Button variant="primary" className="mt-3" onClick={handleShare}>
        Share List
      </Button>
    </div>
  );
}

export default ShareList;

