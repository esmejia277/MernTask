import React, { useContext } from 'react';
import TaskContext from '../../context/tasks/taskContext';
import ProjectContext from '../../context/projects/projectContext';

const Task = ({task}) => {
  
  
  const projectContext = useContext(ProjectContext);
  const { project } = projectContext;
  
  const taskContext = useContext(TaskContext);
  const { deleteTask, getTasksPerProjectId } = taskContext;

  const deleteATask = id => {
    deleteTask(id);
    getTasksPerProjectId(project.id);
  }

  return (
    <li className="tarea sombra">
      <p>{task.name}</p>
      <div className="estado">
        {task.status ? (
          <button
            type="button"
            className="completo"
          >
            Completo
          </button>
        ) :

        <button
            type="button"
            className="incompleto"
          >
            Incompleto
          </button>
        }
      </div>
      <div className="acciones">
        <button 
          type="button"
          className="btn btn-primario"
        >
          Editar
        </button>

        <button 
          type="button"
          className="btn btn-secundario"
          onClick={() => deleteATask(task.id) }
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
 
export default Task;