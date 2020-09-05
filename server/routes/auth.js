// routes to create users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/authController');

// api/auth 
router.post('/',
  [
    check('email', 'Type a valid email').isEmail(),
    check('password', 'Password must contain at least 6 characters').isLength({ min: 6 })
  ],
  authController.authUser
);

module.exports = router;