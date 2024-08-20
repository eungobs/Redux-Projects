import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListGroup, Spinner, InputGroup, Form, Col, Row, Container, Dropdown } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Importing icons from react-icons
import { fetchItems, updateItem, deleteItem } from '../features/items/itemSlice';
import AddItemForm from './AddItemForm'; // Import the AddItemForm component
import ShareList from './ShareList';
import './ShoppingList.css'; // Import custom CSS file for additional styling

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

const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const status = useSelector((state) => state.items.status);
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', quantity: '', notes: '', category: 'Vegetables' });
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleEdit = () => {
    if (editItem.name && editItem.quantity) {
      dispatch(updateItem({ id: editId, updatedItem: editItem }));
      setEditId(null);
      setEditItem({ name: '', quantity: '', notes: '', category: 'Vegetables' });
    } else {
      alert("Please enter both item name and quantity");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteItem(id));
    }
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditItem({ name: item.name, quantity: item.quantity, notes: item.notes, category: item.category });
  };

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    localStorage.removeItem('authToken'); // Example: Remove token from localStorage

    // Redirect to the homepage
    window.location.href = '/';
  };

  const filteredItems = selectedCategory === 'All' ? items : items.filter(item => item.category === selectedCategory);

  if (status === 'loading') return <Spinner animation="border" variant="primary" />;

  return (
    <Container className="bg-dark text-light p-4 shopping-list-container">
      <Row className="mb-4">
        <Col md={8}>
          <h2 className="my-4">Shopping List</h2>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="success" className="d-flex align-items-center me-3" onClick={() => setEditId(null)}>
            <FaPlus className="me-2" /> Add New Item
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={12}>
          <Dropdown onSelect={(eventKey) => setSelectedCategory(eventKey)}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {selectedCategory || 'Select Category'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map(category => (
                <Dropdown.Item key={category} eventKey={category}>{category}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <AddItemForm /> {/* Include AddItemForm here */}
      <ListGroup>
        {filteredItems.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center list-item">
            {editId === item.id ? (
              <InputGroup>
                <Form.Control
                  placeholder="Item Name"
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                />
                <Form.Control
                  placeholder="Quantity"
                  value={editItem.quantity}
                  onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                />
                <Form.Control
                  placeholder="Notes"
                  value={editItem.notes}
                  onChange={(e) => setEditItem({ ...editItem, notes: e.target.value })}
                />
                <Form.Control
                  as="select"
                  value={editItem.category}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Control>
                <Button variant="success" onClick={handleEdit}>Save</Button>
                <Button variant="secondary" onClick={() => setEditId(null)}>Cancel</Button>
              </InputGroup>
            ) : (
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span>{item.name} - {item.quantity} <br /> Notes: {item.notes} <br /> Category: {item.category}</span>
                </div>
                <div>
                  <FaEdit className="icon edit-icon me-3" onClick={() => startEdit(item)} title="Edit" />
                  <FaTrash className="icon delete-icon" onClick={() => handleDelete(item.id)} title="Delete" />
                </div>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ShareList />
    </Container>
  );
};

export default ShoppingList;
