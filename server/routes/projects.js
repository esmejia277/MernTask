const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');

// middlewares
const auth = require('../middleware/auth');

//api/projects
router.post('/',
  auth,
  [
    check('name', 'The name is mandatory').not().isEmpty(),
  ],
  projectController.createProject
);

router.get('/',
  auth,
  projectController.getProjects
);

router.put('/:id',
  auth,
  [
    check('name', 'The name is mandatory').not().isEmpty(),
  ],
  projectController.updateProject
);

router.delete('/:id',
  auth,
  projectController.deleteProject
);





module.exports = router;