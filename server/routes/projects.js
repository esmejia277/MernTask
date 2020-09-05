const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');

// middlewares
const auth = require('../middleware/auth');

//api/projects
router.post('/',
  [
    check('name', 'The name is mandatory').not().isEmpty(),
  ],
  auth,
  projectController.createProject
);

router.get('/',
  auth,
  projectController.createProject
);

module.exports = router;