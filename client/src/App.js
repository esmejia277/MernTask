import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';
import PrivateRoute from './components/routes/privateRoute';

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/token';


const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NewAccount} />
                <PrivateRoute exact path="/proyectos" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
      </AlertState>
      </TaskState>
   </ProjectState>
  );
}

export default App;
