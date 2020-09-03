// routes to create users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../controllers/userController');

router.post('/',
  [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('email', 'Type a valid email').isEmail(),
    check('password', 'Password must contain at least 6 characters').isLength({ min: 6 })
  ],
  userController.createUser

);

module.exports = router;