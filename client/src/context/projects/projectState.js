import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { 
  FORM_NEW_PROJECT, 
  FETCH_PROJECTS,
  ADD_NEW_PROJECT,
  VALIDATE_FORM_NEW_PROJECT,
  GET_ACTUAL_PROJECT,
  DELETE_PROJECT
} from '../../types';



const ProjectState = props => {

  const projects = [
    { id:1, name: "Tienda virtual" },
    { id:2, name: "Compras de ropa" },
    { id:3, name: "MERN" }
  ]
  
  const initialState = {
    newProjectForm: false,
    projects: [],
    formError: false,
    project: null
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

  // Agregar un proyecto nuevo
  const addNewProject = project => {
    project.id = uuidv4();
    dispatch({
      type: ADD_NEW_PROJECT,
      payload: project
    })
  }

  // Mostrar error formulario
  const showError = () => {
    dispatch({
      type: VALIDATE_FORM_NEW_PROJECT
    })
  }

  // Seleccionar el proyecto al que el usuario dio clic
  const getActualProject = projectId => {
    dispatch({
      type: GET_ACTUAL_PROJECT,
      payload: projectId
    })
  }

  const deleteProject = projectId => {
    dispatch({
      type: DELETE_PROJECT,
      payload: projectId
    })
  }

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        newProjectForm: state.newProjectForm,
        formError: state.formError,
        project: state.project,
        showFormNewProject,
        fetchProjects,
        addNewProject,
        showError,
        getActualProject,
        deleteProject

      }}
    >
      {props.children}

    </projectContext.Provider>
  )
}

export default ProjectState;