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
    case SUCCESSFULL_LOGIN:
    case SUCESSFULL_REGISTER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        authenticated: true,
        message: null,
        loading: false
      }
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false

      }
    case LOGOUT:
    case ERROR_LOGIN:
    case ERROR_REGISTER:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        authenticated: false,
        message: action.payload,
        loading: false

      }
    default:
      return {
        state
      }
  }
}