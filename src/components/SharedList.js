import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ListGroup, Spinner, Container, Row, Col } from 'react-bootstrap';
import './SharedList.css'; // Import custom CSS file for additional styling

const SharedList = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items?code=${id}`);
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch items:', error);
        setLoading(false);
      }
    };
    fetchItems();
  }, [id]);

  if (loading) return <Spinner animation="border" variant="primary" />;

  return (
    <Container className="shared-list-container">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Shared Shopping List</h1>
        </Col>
      </Row>
      <ListGroup>
        {items.map((item) => (
          <ListGroup.Item key={item.id} className="list-item">
            <div className="item-content">
              <span className="item-name">{item.name}</span> - 
              <span className="item-quantity"> {item.quantity}</span>
              <br />
              <span className="item-category">Category: {item.category}</span>
              <br />
              <span className="item-notes">Notes: {item.notes}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default SharedList;
