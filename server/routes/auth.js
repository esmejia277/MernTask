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
  authController.authUser
);

// get authenticated user
router.get('/',
  auth,
  authController.authenticatedUser
)

module.exports = router;