import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, removeItem } from '../features/items/itemSlice';
import { Button, Table, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShareList from './ShareList';
import SearchBar from './SearchBar';

// Updated categories array
const categories = [
  'All',
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

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      selectedCategory === 'All' ? true : item.category === selectedCategory
    );

  return (
    <Container className="bg-dark text-light p-4">
      <h2 className="my-4">Shopping List</h2>
      <SearchBar setSearch={setSearch} />
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {selectedCategory}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categories.map((cat) => (
            <Dropdown.Item key={cat} onClick={() => setSelectedCategory(cat)}>
              {cat}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Notes</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.notes}</td>
              <td>{item.category}</td>
              <td>
                <Link to={`/edit/${item.id}`}>
                  <Button variant="warning" className="me-2">Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => dispatch(removeItem(item.id))}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ShareList />
      <Link to="/add">
        <Button variant="success" className="mt-2">Add New Item</Button>
      </Link>
    </Container>
  );
};

export default ItemList;
