const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const ordersFile = path.join(__dirname, 'data', 'orders.json');

// Ensure the file exists
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, '[]', 'utf-8');
}

router.post('/checkout', (req, res) => {
  const { name, phone, address, pincode, email, cart } = req.body;

  if (!name || !phone || !address || !pincode || !email || !cart || cart.length === 0) {
    return res.status(400).json({ success: false, message: 'Missing required fields or empty cart.' });
  }

  const newOrder = {
    id: Date.now(),
    name,
    phone,
    address,
    pincode,
    email,
    cart,
    date: new Date().toISOString()
  };

  let orders = JSON.parse(fs.readFileSync(ordersFile));
  orders.push(newOrder);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

  res.json({ success: true, message: 'Order placed successfully!' });
});

module.exports = router;
