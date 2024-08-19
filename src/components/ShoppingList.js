import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListGroup, Spinner, InputGroup, Form, Col, Row, Container } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Importing icons from react-icons
import { fetchItems, updateItem, deleteItem } from '../features/items/itemSlice';
import AddItemForm from './AddItemForm'; // Import the AddItemForm component
import ShareList from './ShareList';
import './ShoppingList.css'; // Import custom CSS file for additional styling

const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const status = useSelector((state) => state.items.status);
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', quantity: '', notes: '' });

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleEdit = () => {
    if (editItem.name && editItem.quantity) {
      dispatch(updateItem({ id: editId, updatedItem: editItem }));
      setEditId(null);
      setEditItem({ name: '', quantity: '', notes: '' });
    } else {
      alert("Please enter both item name and quantity");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditItem({ name: item.name, quantity: item.quantity, notes: item.notes });
  };

  if (status === 'loading') return <Spinner animation="border" variant="primary" />;

  return (
    <Container className="bg-dark text-light p-4 shopping-list-container">
      <Row className="mb-4">
        <Col md={8}>
          <h2 className="my-4">Shopping List</h2>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="success" className="d-flex align-items-center" onClick={() => setEditId(null)}>
            <FaPlus className="me-2" /> Add New Item
          </Button>
        </Col>
      </Row>
      <AddItemForm /> {/* Include AddItemForm here */}
      <ListGroup>
        {items.map((item) => (
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
                <Button variant="success" onClick={handleEdit}>Save</Button>
                <Button variant="secondary" onClick={() => setEditId(null)}>Cancel</Button>
              </InputGroup>
            ) : (
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <span>{item.name} - {item.quantity} <br /> Notes: {item.notes}</span>
                </div>
                <div>
                  <FaEdit className="icon me-3" onClick={() => startEdit(item)} title="Edit" />
                  <FaTrash className="icon" onClick={() => handleDelete(item.id)} title="Delete" />
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
