import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { 
  FORM_NEW_PROJECT, 
  FETCH_PROJECTS,
  ADD_NEW_PROJECT
} from '../../types';



const ProjectState = props => {

  const projects = [
    { id:1, name: "Tienda virtual" },
    { id:2, name: "Compras de ropa" },
    { id:3, name: "MERN" }
  ]
  
  const initialState = {
    newProjectForm: false,
    projects: [

    ]
  }
  
  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const showFormNewProject = () => {
    dispatch({
      type: FORM_NEW_PROJECT,
    })
  }

  //obtener los proyectos de la base de datos
  const fetchProjects = () => {
    dispatch({
      type: FETCH_PROJECTS,
      payload: projects
    })
  }

  const addNewProject = project => {
    project.id = uuidv4();
    dispatch({
      type: ADD_NEW_PROJECT,
      payload: project
    })
  }

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        newProjectForm: state.newProjectForm,
        showFormNewProject,
        fetchProjects,
        addNewProject
      }}
    >
      {props.children}

    </projectContext.Provider>
  )
}

export default ProjectState;