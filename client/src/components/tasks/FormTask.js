import React, { useContext, useState, useEffect } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';



const FormTask = () => {

  const projectContext = useContext(ProjectContext);
  const { project } = projectContext;

  const taskContext = useContext(TaskContext);
  const { taskError, addNewTask, validateTask, getTasksPerProjectId, selectedTask, updateTask } = taskContext;

  useEffect(() => {
    if (selectedTask !== null) {
      setTask(selectedTask);
    } else {
      setTask({
        name: ''
      });
    }
  }, [selectedTask])

  const [task, setTask] = useState({
    name: ''
  });

  const { name } = task;


  if (!project) {
    return null
  }

  const [ actualProject ] = project;

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '') {
      validateTask();
      return
    }

    if (selectedTask === null) {
      task.projectId = actualProject.id;
      task.status = false;
      addNewTask(task);
    } else {
      updateTask(task);

    }



    
    getTasksPerProjectId(actualProject.id);
    setTask({
      name: '',
    });

  }

  const handleChange = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  }



  return (
    <div className="formulario">
      <form
        onSubmit={handleSubmit}
      >
        <div className="contener-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </div>

        <div className="contener-input">
            <input
              type="submit"
              className="btn btn-primary btn-submit btn-block"
              value={selectedTask ? "Editar tarea" : "Agregar tarea"}
            /> 
        </div>
      </form>
      {taskError && 
        <p className="mensaje error">
          El nombre de la tarea es obligatorio
      </p>}
    </div>
  );
}
 
export default FormTask;