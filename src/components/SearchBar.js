import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Form.Control
      type="text"
      placeholder="Search items..."
      onChange={handleChange}
    />
  );
};

export default SearchBar;

