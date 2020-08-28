import { 
  FORM_NEW_PROJECT,
  FETCH_PROJECTS,
  ADD_NEW_PROJECT,
  VALIDATE_FORM_NEW_PROJECT,
  GET_ACTUAL_PROJECT,
  DELETE_PROJECT

} from '../../types';

export default (state, action) => {
  switch(action.type) {
    case FORM_NEW_PROJECT:
      return {
        ...state,
        newProjectForm: true
      }
    case FETCH_PROJECTS:
      return {
        ...state,
        projects: action.payload
      }
    case ADD_NEW_PROJECT:
      return {
        ...state,
        projects: [ ...state.projects, action.payload],
        newProjectForm: false,
        formError: false,
      }
    case VALIDATE_FORM_NEW_PROJECT:
      return {
        ...state,
        formError: true
      }
    case GET_ACTUAL_PROJECT:
      return {
        ...state,
        project: state.projects.filter(project => project.id === action.payload)
      }
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        project: null
      }

    default:
      return state
  }
}