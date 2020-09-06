const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

// create task
exports.createTask = async (req, res) => {
  // check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extract project
  const { project } = req.body;

  try {
    // check if the project already does exists
    const existsProject = await Project.findById(project);
    if (!existsProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // check project creator
    if (existsProject.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

// get tasks by project
exports.getTasks = async (req, res) => {
  try {
    // extract project
    const { project } = req.body;
    console.log('project id, ', project)

    // check if the project already does exists
    const existsProject = await Project.findById(project);

    if (!existsProject)  {
      return res.status(404).json({ msg: "Project not found" });
    }

    // check project creator
    if (existsProject.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const tasks = await Task.find({ project });
    res.json(tasks);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};


// update task
exports.updateTask = async (req, res) => {

  try {
    // extract project
    const { project, name, status } = req.body;

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task does not exists" });
    }

    const existsProject = await Project.findById(project);

    // check project creator
    if (existsProject.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    let newTask = {};
    if (name) newTask.name = name;
    if (status) newTask.status = status;

    // save task

    task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      newTask,
      {
        new: true
      }
    );

    res.json({ task })
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
}

exports.deleteTask = async (req, res) => {

  try {
    // extract project
    const { project } = req.body;

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task does not exists" });
    }

    const existsProject = await Project.findById(project);

    // check project creator
    if (existsProject.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // delete task
    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({msg: 'Deleted task'})

    res.json({ task })
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }

}