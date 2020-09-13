import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
  TASK_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK
} from '../../types';
import axiosClient from '../../config/axios';

const TaskState = props => {

  const initialState = {
    taskProject: [],
    taskError: false,
    selectedTask: null,
  }

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // Obtener las tareas de un proyecto
  const getTasksPerProjectId = async project => {
    try {
      const result = await axiosClient.get('/api/tasks', { params: { project }});
      dispatch({
        type: TASK_PROJECT,
        payload: result.data
      });
      
    } catch (error) {
      console.error(error);
    }
  }

  const addNewTask = async task => {
    try {
      await axiosClient.post('/api/tasks', task);
      dispatch({
        type: ADD_TASK,
        payload: task
      })
      
    } catch (error) {
      console.error(error.message);
    }
  }

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK
    })
  }

  const deleteTask = async (taskId, project) => {
    try {
      await axiosClient.delete(`/api/tasks/${taskId}`, { params: { project } });
      dispatch({
        type: DELETE_TASK,
        payload: taskId
      });
    } catch (error) {
      console.error(error);
    }

  }

  const updateTask = async task => {
    try {
      const result = await axiosClient.put(`/api/tasks/${task._id}`,  task );
      dispatch({
        type: UPDATE_TASK,
        payload: result.data.task
      });

    } catch(error) {
      console.error(error);
    }

  }

  const getActualTask = task => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task
    })
  }


  return (
    <TaskContext.Provider
      value={{
        taskProject: state.taskProject,
        taskError: state.taskError,
        selectedTask: state.selectedTask,
        getTasksPerProjectId,
        addNewTask,
        validateTask,
        deleteTask,
        getActualTask,
        updateTask

      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState;