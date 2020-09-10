import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';


const Project = ({project}) => {

  const projectContext = useContext(ProjectContext);
  const { getActualProject } = projectContext;
  
  const taskContext = useContext(TaskContext);
  const { getTasksPerProjectId } = taskContext;


  const selectProject = id => {
    getActualProject(id); 
    getTasksPerProjectId(id);
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={ () => selectProject(project._id) }
      >
        { project.name }      
      </button>
    </li>
  );
}
 
export default Project;