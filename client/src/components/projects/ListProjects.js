import React, { useContext, useEffect } from "react";
import Project from "./Project";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProjectContext from '../../context/projects/projectContext';


const ListProjects = () => {

  // extraer proyectos del state inicial global
  const projectContext = useContext(ProjectContext);
  const { projects, fetchProjects } = projectContext;

  // Obtener proyectos cuando carga el componente
  useEffect( () => {
    fetchProjects();
    // eslint-disable-next-line

  }, []);



  if (projects.length === 0) return <p>No hay proyectos, comienza creando uno...</p>;

  return (
    <ul className="listado-proyectos">

      <TransitionGroup>
      {projects.map((project) => (
        <CSSTransition
            key={project.id}
            timeout={200}
            classNames="proyecto">
          <Project key={project.id} project={project} />
        </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListProjects;
