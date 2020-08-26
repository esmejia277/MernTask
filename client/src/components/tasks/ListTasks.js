import React from 'react';
import Task from './Task';

const ListTasks = () => {

  const tasks = [
    {name: "Elegitar plataforma", status: true},
    {name: "Elegitar colores", status: false},
    {name: "Elegitar hosting", status: true},
  ]

  return (
    <>
      <h2>Proyecto: Tienda virtual</h2>
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
      >
        Eliminar proyecto &times;
      </button>
    </>
  );
}
 
export default ListTasks;