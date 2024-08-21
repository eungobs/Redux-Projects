import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import SearchBar from './SearchBar';

function ShareList() {
  const items = useSelector((state) => state.items.items);
  const [filteredItems, setFilteredItems] = useState(items);

  // Function to handle WhatsApp sharing
  const handleWhatsappShare = () => {
    const listContent = filteredItems
      .map((item) => `${item.name} - ${item.quantity} - Category: ${item.category}`)
      .join('%0A');

    const whatsappUrl = `https://wa.me/?text=${listContent}`;
    window.open(whatsappUrl, '_blank');
  };

  // Function to handle search
  const handleSearch = (query) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      <h2>Share Shopping List</h2>
      <SearchBar onSearch={handleSearch} />
      <ListGroup>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
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
