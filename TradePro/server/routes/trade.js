const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/buy', auth, async (req, res) => {
  const { symbol, price, quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const cost = price * quantity;

    if (user.wallet < cost) return res.status(400).json({ msg: 'Insufficient funds' });

    user.wallet -= cost;
    const index = user.portfolio.findIndex(p => p.symbol === symbol);
    if (index !== -1) {
        const p = user.portfolio[index];
        const totalCost = (p.quantity * p.avgPrice) + cost;
        p.quantity += quantity;
        p.avgPrice = totalCost / p.quantity;
    } else {
        user.portfolio.push({ symbol, quantity, avgPrice: price });
    }

    await user.save();
    res.json(user.portfolio);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;