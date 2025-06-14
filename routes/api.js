// routes/api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const flowersPath = path.join(__dirname, '../data/flowers.json');
const cartPath = path.join(__dirname, '../data/cart.json');

// GET flowers
router.get('/api/flowers', (req, res) => {
  fs.readFile(flowersPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Unable to read flowers data' });
    res.json(JSON.parse(data));
  });
});

// POST to cart
router.post('/api/cart', (req, res) => {
  fs.writeFile(cartPath, JSON.stringify(req.body), err => {
    if (err) return res.status(500).json({ error: 'Unable to save cart data' });
    res.json({ message: 'Cart saved successfully' });
  });
});

module.exports = router;
