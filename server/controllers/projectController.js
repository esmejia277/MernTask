const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {


  // check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    //create project
    const project = new Project(req.body);

    //save createdBy JWT
    project.createdBy = req.user.id;
    project.save()
    res.status(200).json(project);

  } catch(error) {
    console.log(error);
    res.status(500).send('Error');
  }
}