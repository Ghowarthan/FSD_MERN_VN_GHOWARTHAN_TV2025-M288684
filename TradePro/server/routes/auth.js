const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  console.log("1. Registration attempt started..."); // Debug Step 1
  const { name, email, password } = req.body;

  try {
    console.log("2. Checking if user exists...");
    let user = await User.findOne({ email });
    
    if (user) {
        console.log("!!! ERROR: User already exists in DB");
        return res.status(400).json({ msg: 'User already exists' });
    }

    console.log("3. Creating new user object...");
    user = new User({ name, email, password });
    
    console.log("4. Hashing password...");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    console.log("5. Saving to MongoDB...");
    await user.save();
    console.log("6. User saved successfully!");

    console.log("7. Generating Token...");
    const payload = { user: { id: user.id } };
    
    jwt.sign(payload, "mysecretkey123", { expiresIn: 360000 }, (err, token) => {
      if (err) {
          console.log("!!! JWT ERROR:", err);
          throw err;
      }
      console.log("8. Success! Sending token.");
      res.json({ token });
    });

  } catch (err) {
    console.error("!!! CRASH REPORT !!!");
    console.error(err.message);
    res.status(500).send('Server error: ' + err.message);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, "mysecretkey123", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;