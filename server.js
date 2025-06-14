// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// POST route to handle checkout
app.post('/api/checkout', (req, res) => {
  const newOrder = req.body;

  fs.readFile('orders.json', 'utf8', (err, data) => {
    let orders = [];
    if (!err && data) {
      orders = JSON.parse(data);
    }

    orders.push(newOrder);

    fs.writeFile('orders.json', JSON.stringify(orders, null, 2), err => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to save order.' });
      }
      res.json({ success: true });
    });
  });
});

// Route for checkout
const checkoutRoute = require('./checkout');
app.use('/', checkoutRoute);

// POST route to save contact messages
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
  };

  const filePath = path.join(__dirname, "data", "messages.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    let messages = [];
    if (!err && data) {
      messages = JSON.parse(data);
    }

    messages.push(newMessage);

    fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save message." });
      }
      res.json({ success: true, message: "Message saved successfully!" });
    });
  });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
