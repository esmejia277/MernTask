const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createProject = async (req, res) => {
  // check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    //create project
    const project = new Project(req.body);

    //save createdBy JWT
    project.createdBy = req.user.id;
    project.save();
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id,
    }).sort({ dateCreation: -1 });
    res.json({ projects });
  } catch (error) {
    console.log(error);
  }
};

exports.updateProject = async (req, res) => {
  // check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name } = req.body;
  let newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    // check id
    let project = await Project.findById(req.params.id);

    // verify if project does exists
    if (!project)
      return res.status(404).json({ msg: "Project does not exists" });

    // check project creator
    if (project.createdBy.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    // update
    project = await Project.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: newProject,
      },
      {
        new: true,
      }
    );

    res.json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

exports.deleteProject = async (req, res) => {
  try {
    // check id
    let project = await Project.findById(req.params.id);

    // verify if project does exists
    if (!project)
      return res.status(404).json({ msg: "Project does not exists" });

    // check project creator
    if (project.createdBy.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    // delete a project

    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ meg: 'Deleted project '});

  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};
