const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register route with validation
router.post(
  '/register', 
  [
    body('username').isLength({ min: 3 }).trim().escape()
      .withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  registerUser
);

// Login route with validation
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('password').notEmpty()
      .withMessage('Password is required')
  ],
  loginUser
);

// Profile route (protected)
router.get('/profile', protect, getUserProfile);

module.exports = router;