import React, { useContext, useEffect } from "react";
import Project from "./Project";

import ProjectContext from '../../context/projects/projectContext';


const ListProjects = () => {

  // extraer proyectos del state inicial global
  const projectContext = useContext(ProjectContext);
  const { projects, fetchProjects } = projectContext;

  // Obtener proyectos cuando carga el componente
  useEffect( () => {
    fetchProjects();

  }, []);



  if (projects.length === 0) return null;

  return (
    <ul className="listado-proyectos">
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default ListProjects;
