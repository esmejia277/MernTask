import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { FORM_NEW_PROJECT } from '../../types';

const ProjectState = props => {
  
  const initialState = {
    newProjectForm: false,
  }
  
  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const showFormNewProject = () => {
    dispatch({
      type: FORM_NEW_PROJECT,
    })
  }

  return (
    <projectContext.Provider
      value={{
        newProjectForm: state.newProjectForm,
        showFormNewProject
      }}
    >
      {props.children}

    </projectContext.Provider>
  )
}

export default ProjectState;