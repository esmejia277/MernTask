import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/projectContext';


const FormTask = () => {

  const projectContext = useContext(ProjectContext);
  const { project } = projectContext;

  if (!project) {
    return null
  }

  const [ actualProject ] = project;


  return (
    <div className="formulario">
      <form>
        <div className="contener-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea"
            name="nombre"
          />
        </div>

        <div className="contener-input">
          <input
            type="submit"
            className="btn btn-primary btn-submit btn-block"
            value="Agregar tarea"
          />
        </div>
      </form>
    </div>
  );
}
 
export default FormTask;