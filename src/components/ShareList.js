import React from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

function ShareList() {
  const items = useSelector((state) => state.items.items);

  // Function to handle sharing via WhatsApp
  const handleWhatsappShare = () => {
    const listContent = items
      .map((item) => `${item.name} - ${item.quantity} - Category: ${item.category}`)
      .join('%0A');

    const whatsappUrl = `https://wa.me/?text=${listContent}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div>
      <h2>Share Shopping List</h2>
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
      <Button variant="success" className="mt-3" onClick={handleWhatsappShare}>
        Share via WhatsApp
      </Button>
    </div>
  );
}

export default ShareList;
