import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
  TASK_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  STATUS_TASK,
  ACTUAL_TASK,
  UPDATE_TASK
} from '../../types';
import { v4 as uuidv4 } from 'uuid';

const TaskState = props => {

  const initialState = {
    tasks: [
      {id:1, name: "Elegitar plataforma", status: true, projectId: 1},
      {id:2, name: "Elegitar colores", status: false, projectId: 2},
      {id:3, name: "Elegitar hosting", status: true, projectId: 3},
      {id:4, name: "Elegitar plataforma", status: true, projectId: 1},
      {id:5, name: "Elegitar colores", status: false, projectId: 2},
      {id:6, name: "Elegitar hosting", status: true, projectId: 3},
    ],
    taskProject: null,
    taskError: false,
    selectedTask: null,
  }

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // Obtener las tareas de un proyecto
  const getTasksPerProjectId = projectId => {
    dispatch({
      type: TASK_PROJECT,
      payload: projectId
    })
  }

  const addNewTask = task => {
    task.id = uuidv4();
    dispatch({
      type: ADD_TASK,
      payload: task
    })
  }

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK
    })
  }

  const deleteTask = taskId => {
    dispatch({
      type: DELETE_TASK,
      payload: taskId
    })
  }

  const changeStatusTask = task => {
    dispatch({
      type: STATUS_TASK,
      payload: task
    })
  }

  const getActualTask = task => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task
    })
  }

  const updateTask = task => {
    dispatch({
      type: UPDATE_TASK,
      payload: task
    })
  }


  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        taskProject: state.taskProject,
        taskError: state.taskError,
        selectedTask: state.selectedTask,
        getTasksPerProjectId,
        addNewTask,
        validateTask,
        deleteTask,
        changeStatusTask,
        getActualTask,
        updateTask

      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState;