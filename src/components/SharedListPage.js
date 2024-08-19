import React from 'react';
import { useNavigate } from 'react-router-dom';
import SharedList from './SharedList';
import ShareList from './ShareList';
import { Button, Container } from 'react-bootstrap';

const SharedListPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Shared Lists</h1>
      <SharedList />
      <ShareList />
      <Button variant="primary" className="mt-4" onClick={() => navigate('/')}>
        Go to Shopping and Search
      </Button>
    </Container>
  );
};

export default SharedListPage;
