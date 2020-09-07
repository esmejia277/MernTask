import {
  SUCESSFULL_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  SUCCESSFULL_LOGIN,
  ERROR_LOGIN,
  LOGOUT
}  from '../../types';


export default (state, action) => {
  switch(action.type) {
    case SUCESSFULL_REGISTER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        authenticated: true,
        message: null
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload
      }
    case ERROR_LOGIN:
    case ERROR_REGISTER:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        message: action.payload
      }

    default:
      return {
        state
      }
  }
}