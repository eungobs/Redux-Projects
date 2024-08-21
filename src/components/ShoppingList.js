import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, addItem, updateItem, deleteItem } from '../features/items/itemSlice';
import { FaPlus, FaWhatsapp, FaTrash, FaEdit } from 'react-icons/fa';
import { Container, Row, Col, Form, Button, ListGroup, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './ShoppingList.css';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.items.items);
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', quantity: '', notes: '', category: 'Vegetables', date: '' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveItem = () => {
    if (editId) {
      dispatch(updateItem({ id: editId, ...editItem }));
    } else {
      dispatch(addItem(editItem));
    }
    setEditId(null);
    setEditItem({ name: '', quantity: '', notes: '', category: 'Vegetables', date: '' });
  };

  const handleEditItem = (item) => {
    setEditId(item.id);
    setEditItem(item);
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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

  const handleShare = () => {
    const message = generateListMessage(items);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLogout = () => {
    navigate('/'); // Navigate to the homepage or login page
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
            {filteredItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col>
                    <h5>{item.name}</h5>
                    <p>Quantity: {item.quantity}</p>
                    <p>Notes: {item.notes}</p>
                    <p>Category: {item.category}</p>
                    <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                  </Col>
                  <Col className="text-end">
                    <Button variant="outline-primary" onClick={() => handleEditItem(item)} className="me-2">
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleDeleteItem(item.id)} className="ms-2">
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ShoppingList;
