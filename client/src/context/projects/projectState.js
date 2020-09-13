import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { 
  FORM_NEW_PROJECT, 
  FETCH_PROJECTS,
  ADD_NEW_PROJECT,
  VALIDATE_FORM_NEW_PROJECT,
  GET_ACTUAL_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR
} from '../../types';
import axiosClient from '../../config/axios'


const ProjectState = props => {

  
  const initialState = {
    newProjectForm: false,
    projects: [],
    formError: false,
    project: null,
    message: null
  }
  
  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const showFormNewProject = () => {
    dispatch({
      type: FORM_NEW_PROJECT,
    })
  }

  //obtener los proyectos de la base de datos
  const fetchProjects = async () => {
    try {
      const result = await axiosClient.get('/api/projects');
      dispatch({
        type: FETCH_PROJECTS,
        payload: result.data.projects
      });

    } catch (error) {
      const alert = {
        msg: "Hubo un error",
        category: 'alerta-error'
      }
      dispatch({
        type: PROJECT_ERROR,
        payload: alert
      })
    }
  }

  // Agregar un proyecto nuevo
  const addNewProject = async project => {
    try {
      const result = await axiosClient.post('/api/projects', project);
      dispatch({
        type: ADD_NEW_PROJECT,
        payload: result.data
      });
    } catch (error) {
      const alert = {
        msg: "Hubo un error",
        category: 'alerta-error'
      }
      dispatch({
        type: PROJECT_ERROR,
        payload: alert
      })
    }
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

  const deleteProject = async projectId => {
    try {
      await axiosClient.delete(`/api/projects/${projectId}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId
      });
    } catch (error) {
      const alert = {
        msg: "Hubo un error",
        category: 'alerta-error'
      }
      dispatch({
        type: PROJECT_ERROR,
        payload: alert
      })
    }
  }

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        newProjectForm: state.newProjectForm,
        formError: state.formError,
        project: state.project,
        message: state.message,
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