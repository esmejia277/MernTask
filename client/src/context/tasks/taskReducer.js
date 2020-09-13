import {
  TASK_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK
} from '../../types';



export default (state, action) => {
  switch(action.type) {

    case TASK_PROJECT:
      return {
        ...state,
        taskProject: action.payload
      }
    case ADD_TASK:
      return {
        ...state,
        taskProject: [action.payload, ...state.taskProject],
        taskError: false,
      }
    case VALIDATE_TASK:
      return {
        ...state,
        taskError: true,
      }
    case DELETE_TASK:
      return {
        ...state,
        taskProject: state.taskProject.filter(task => task._id !== action.payload)

      }
    case UPDATE_TASK:
      return {
        ...state,
        taskProject: state.taskProject.map(task => task._id === action.payload._id ? action.payload : task),
        selectedTask: null
      }
    case ACTUAL_TASK:
      return {
        ...state,
        selectedTask:  action.payload
      }
    
    default:
      return state
  }
}