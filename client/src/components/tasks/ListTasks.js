import React, { useContext } from 'react';
import Task from './Task';


import ProjectContext from '../../context/projects/projectContext';


const ListTasks = () => {

  const projectContext = useContext(ProjectContext);
  const { project, deleteProject } = projectContext;

  // Si no hay proyecto seleccionado
  if (!project) {
    return <h2>Selecciona un proyecto</h2>
  }

  const [ actualProject ] = project;

  const tasks = [
    {name: "Elegitar plataforma", status: true},
    {name: "Elegitar colores", status: false},
    {name: "Elegitar hosting", status: true},
  ]

  return (
    <>
      <h2>Proyecto: {actualProject.name}</h2>
      <ul className="listado-tareas">
      {tasks.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) :
        tasks.map( task => (
          <Task
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