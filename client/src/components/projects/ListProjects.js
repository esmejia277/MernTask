import React, { useContext, useEffect } from "react";
import Project from "./Project";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProjectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext';


const ListProjects = () => {


  // extraer proyectos del state inicial global
  const projectContext = useContext(ProjectContext);
  const { message, projects, fetchProjects } = projectContext;


  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  

  // Obtener proyectos cuando carga el componente
  useEffect( () => {

    // si hay un error
    if (message) {
      showAlert(message.msg, message.category);
    }

    fetchProjects();
    
    // eslint-disable-next-line
  }, [message]);


  if (projects.length === 0) return <p>No hay proyectos, comienza creando uno...</p>;

  return (
    <ul className="listado-proyectos">

      { alert ? (
        <div className={`alerta ${alert.category}`}>
         {alert.message}
        </div>
        )
        : null
      }

      <TransitionGroup>
      {projects.map((project) => (
        <CSSTransition
            key={project._id}
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
