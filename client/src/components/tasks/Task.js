import React, { useContext } from 'react';
import TaskContext from '../../context/tasks/taskContext';
import ProjectContext from '../../context/projects/projectContext';

const Task = ({task}) => {
  
  
  const projectContext = useContext(ProjectContext);
  const { project } = projectContext;
  
  const taskContext = useContext(TaskContext);
  const { deleteTask, getTasksPerProjectId, changeStatusTask, getActualTask } = taskContext;

  const [actualProject] = project;

  const deleteATask = id => {
    deleteTask(id);
    getTasksPerProjectId(actualProject.id);
  }

  const handleChangeStatusTask = task => {
    if (task.status) {
      task.status = false;
    } else {
      task.status = true;
    }
    changeStatusTask(task);
  }

  const selectActualTask = task => {
    getActualTask(task);
  }

  return (
    <li className="tarea sombra">
      <p>{task.name}</p>
      <div className="estado">
        {task.status ? (
          <button
            type="button"
            className="completo"
            onClick={ () => handleChangeStatusTask(task) }
          >
            Completo
          </button>
        ) :

        <button
            type="button"
            className="incompleto"
            onClick={ () => handleChangeStatusTask(task) }

          >
            Incompleto
          </button>
        }
      </div>
      <div className="acciones">
        <button 
          type="button"
          className="btn btn-primario"
          onClick={ () => selectActualTask(task) }
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