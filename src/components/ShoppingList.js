import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, addItem, updateItem, deleteItem } from '../features/items/itemSlice';
import { FaPlus, FaWhatsapp, FaTrash, FaEdit } from 'react-icons/fa';
import { Container, Row, Col, Form, Button, ListGroup, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './ShoppingList.css';

const ShoppingList = () => {
  // Initialize Redux dispatch function and navigate function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve items from the Redux store
  const items = useSelector((state) => state.items.items);

  // State for managing item editing and filtering
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', quantity: '', notes: '', category: 'Vegetables', date: '' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch items when the component mounts
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));
  };

  // Save or update an item based on editId
  const handleSaveItem = () => {
    if (editId) {
      dispatch(updateItem({ id: editId, ...editItem }));
    } else {
      const newItem = { ...editItem, id: Date.now() }; // Ensure a unique ID
      dispatch(addItem(newItem));
    }
    setEditId(null);
    setEditItem({ name: '', quantity: '', notes: '', category: 'Vegetables', date: '' });
  };

  // Set up an item for editing
  const handleEditItem = (item) => {
    setEditId(item.id);
    setEditItem(item);
  };

  // Delete an item
  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  // Filter items by category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Generate message for sharing the list via WhatsApp
  const generateListMessage = (items) => {
    let message = 'Here is my shopping list:\n\n';
    items.forEach(item => {
      message += `• ${item.name} - ${item.quantity}\n`;
      if (item.notes) {
        message += `  Notes: ${item.notes}\n`;
      }
      if (item.category) {
        message += `  Category: ${item.category}\n`;
      }
      if (item.date) {
        message += `  Date: ${new Date(item.date).toLocaleDateString()}\n`;
      }
      message += '\n';
    });
    return encodeURIComponent(message);
  };

  // Share the list via WhatsApp
  const handleShare = () => {
    const message = generateListMessage(items);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Log out and navigate to the homepage or login page
  const handleLogout = () => {
    navigate('/'); // Navigate to the homepage or login page
  };

  // Handle search query input
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter items based on category and search query
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <Container className="shopping-list-container">
      <Row className="mb-4 align-items-center">
        <Col md={8}>
          <h2>Shopping List</h2>
        </Col>
        <Col md={4} className="text-end">
          <Button className="button-primary me-3" onClick={() => setEditId(null)}>
            <FaPlus className="me-2" /> Add New Item
          </Button>
          <Button className="button-success me-3" onClick={handleShare}>
            <FaWhatsapp className="me-2" /> Share List
          </Button>
          <Button className="button-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Filter by Category: {selectedCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* Dropdown menu for selecting item category */}
              <Dropdown.Item onClick={() => handleCategoryChange('All')}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Vegetables')}>Vegetables</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Cleaning Products')}>Cleaning Products</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Cosmetics')}>Cosmetics</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Clothes')}>Clothes</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Hardware')}>Hardware</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Fruits')}>Fruits</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Bakery')}>Bakery</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Snacks')}>Snacks</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Beverages')}>Beverages</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Dairy Products')}>Dairy Products</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Meat')}>Meat</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Pharmacy')}>Pharmacy</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Frozen')}>Frozen</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Other')}>Other</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form>
            {/* Form for adding or editing items */}
            <Form.Group className="mb-3" controlId="formItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editItem.name}
                onChange={handleInputChange}
                placeholder="Enter item name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formItemQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={editItem.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formItemNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                name="notes"
                value={editItem.notes}
                onChange={handleInputChange}
                placeholder="Enter notes"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formItemCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={editItem.category}
                onChange={handleInputChange}
              >
                <option>Vegetables</option>
                <option>Cleaning Products</option>
                <option>Cosmetics</option>
                <option>Clothes</option>
                <option>Hardware</option>
                <option>Fruits</option>
                <option>Bakery</option>
                <option>Snacks</option>
                <option>Beverages</option>
                <option>Dairy Products</option>
                <option>Meat</option>
                <option>Pharmacy</option>
                <option>Frozen</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formItemDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editItem.date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSaveItem}>
              {editId ? 'Update Item' : 'Add Item'}
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <ListGroup>
            {/* Display the list of items */}
            {filteredItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p>Quantity: {item.quantity}</p>
                    <p>Notes: {item.notes}</p>
                    <p>Category: {item.category}</p>
                    <p>Date: {item.date ? new Date(item.date).toLocaleDateString() : ''}</p>
                  </div>
                  <div>
                    <Button
                      variant="outline-warning"
                      className="me-2"
                      onClick={() => handleEditItem(item)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ShoppingList;