import React from "react";

import Sidebar from "../layout/Sidebar";
import Bar from "../layout/Bar";
import FormTask from '../tasks/FormTask';
import ListTasks from '../tasks/ListTasks';


const Projects = () => {
  return (
    <div className="contenedor-app">
      <Sidebar />

      <div className="seccion-principal">
        <Bar />
        <main>
          <FormTask />
          <div className="contenedor-tareas">
            <ListTasks />

          </div>
        </main>
      </div>



    </div>
  )
};

export default Projects;