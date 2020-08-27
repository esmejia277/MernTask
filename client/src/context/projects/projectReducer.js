import { FORM_NEW_PROJECT } from '../../types';

export default (state, action) => {
  switch(action.type) {
    case FORM_NEW_PROJECT:
      return {
        ...state,
        newProjectForm: true
      }

    default:
      return state
  }
}