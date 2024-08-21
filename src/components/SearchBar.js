import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    // Trigger search every time query changes
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
