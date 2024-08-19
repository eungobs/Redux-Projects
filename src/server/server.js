const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any service here
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

app.post('/send-email', (req, res) => {
  const { email, listContent } = req.body;

  // Basic email validation (you can use more robust validation)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).send('Invalid email address');
  }

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Shared Shopping List',
    text: listContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Failed to send email');
    }
    res.status(200).send('Email sent successfully');
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
