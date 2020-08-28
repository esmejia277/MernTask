import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/projectContext';

const Project = ({project}) => {

  const projectContext = useContext(ProjectContext);
  const { getActualProject } = projectContext;

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={ () => getActualProject(project.id) }
      >
        { project.name }      
      </button>
    </li>
  );
}
 
export default Project;