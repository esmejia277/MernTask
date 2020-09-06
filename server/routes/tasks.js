const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { check } = require('express-validator');

// middlewares
const auth = require('../middleware/auth');

router.post('/',
  auth,
  [
    check('name', 'Required name').not().isEmpty(),
    check('project', 'Required project').not().isEmpty()

  ],
  taskController.createTask
);

router.get('/',
  auth,
  taskController.getTasks
);

router.put('/:id',
  auth,
  taskController.updateTask
);

router.delete('/:id',
  auth,
  taskController.deleteTask
);


module.exports = router;