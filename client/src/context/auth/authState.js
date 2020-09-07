import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  SUCESSFULL_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  SUCCESSFULL_LOGIN,
  ERROR_LOGIN,
  LOGOUT
}  from '../../types';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/token'

const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    message: null
  }

  const [ state, dispatch ] = useReducer(AuthReducer, initialState);

  const registerUser = async data => {
    try {
      const response = await axiosClient.post('/api/users', data);
      dispatch({
        type: SUCESSFULL_REGISTER,
        payload: response.data
      });

      authenticatedUser();

    } catch(error) {
      console.error(error);
      const alert = {
        msg: error.response.data.msg,
        category: 'alerta-error'
      }
      dispatch({
        type: ERROR_REGISTER,
        payload: alert
      });
    }
  }

  // It returns authenticated user
  const authenticatedUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }
    try {
      const response = await axiosClient.get('/api/auth');
      dispatch({
        type: GET_USER,
        payload: response.data
      });
    } catch(error) {
      console.log(error);
      dispatch({
        type: ERROR_LOGIN
      })
    }
  }


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        registerUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
    
  )

}

export default AuthState;