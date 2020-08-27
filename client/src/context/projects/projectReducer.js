import { 
  FORM_NEW_PROJECT,
  FETCH_PROJECTS,
  ADD_NEW_PROJECT

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
        newProjectForm: false
        
      }

    default:
      return state
  }
}