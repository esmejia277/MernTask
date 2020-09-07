// routes to create users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/authController');

// middlewares
const auth = require('../middleware/auth');

// api/auth
// login in
router.post('/',
  [
    check('email', 'Type a valid email').isEmail(),
    check('password', 'Password must contain at least 6 characters').isLength({ min: 6 })
  ],
  authController.authUser
);

// get authenticated user
router.get('/',
  auth,
  authController.authenticatedUser
)

module.exports = router;