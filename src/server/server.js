const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Removed email handling as we're focusing on WhatsApp sharing

app.post('/share-list', (req, res) => {
  const { listContent } = req.body;



  if (!listContent) {
    return res.status(400).send('List content is required');
  }

  // Success response
  res.status(200).send('List content received successfully');
});

app.listen(5000, () => console.log('Server running on port 5000'));
