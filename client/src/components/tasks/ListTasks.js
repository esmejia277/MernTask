import React, { useContext } from 'react';
import Task from './Task';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';


const ListTasks = () => {

  const projectContext = useContext(ProjectContext);
  const { project, deleteProject } = projectContext;

  const taskContext = useContext(TaskContext);
  const { taskProject } = taskContext;


  // Si no hay proyecto seleccionado
  if (!project) {
    return <h2>Selecciona un proyecto</h2>
  }

  const [ actualProject ] = project;

  return (
    <>
      <h2>Proyecto: {actualProject.name}</h2>
      <ul className="listado-tareas">
      {taskProject.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) :
        taskProject.map( task => (
          <Task
            key={task.id}
            task={task}
          />
        ))
    }
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={ () => deleteProject(actualProject.id) }
      >
        Eliminar proyecto &times;
      </button>
    </>
  );
}
 
export default ListTasks;