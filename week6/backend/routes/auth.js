const express = require('express');
const router = express.Router();
const { hashPassword, comparePassword } = require('../utils/password');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // TODO: Implement user registration
    // 1. Validate input (check username and password are not empty)
    // 2. Check if user already exists (query database)
    // 3. Hash password using: const hashedPassword = await hashPassword(password);
    // 4. Insert into database with hashedPassword
    // 5. Return user info (id, username) - DO NOT return password

    res.status(200).json({ message: 'Register endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // TODO: Implement user login
    // 1. Validate input (check username and password are not empty)
    // 2. Find user by username (query database)
    // 3. Verify password using: const isValid = await comparePassword(password, user.password);
    // 4. If valid, create session: req.session.userId = user.id;
    // 5. Return user info (id, username) - DO NOT return password

    res.status(200).json({ message: 'Login endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  try {
    // TODO: Implement logout
    // 1. Destroy session
    // 2. Clear session cookie

    res.status(200).json({ message: 'Logout endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', (req, res) => {
  try {
    // TODO: Implement current user retrieval
    // 1. Check if user is authenticated (check session)
    // 2. Return user info or 401

    res.status(200).json({ message: 'Me endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
