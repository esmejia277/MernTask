import React, { useState, useContext } from "react";
import ProjectContext from '../../context/projects/projectContext';

const NewProject = () => {

  // connect to the state with context
  const projectContext = useContext(ProjectContext);
  const { newProjectForm,
    formError,
    showFormNewProject,
    addNewProject,
    showError 
  } = projectContext;

  const [project, setProject] = useState({
    name: '',

  });

  const { name } = project; 

  const handleChangeProject = e => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmitProject = e => {
    e.preventDefault();

    //validate project
    if (name.trim() === '') {
      showError();
      return
    }
    //add to state
    addNewProject(project);

    //restart form
    setProject({
      name: ''
    });
  }

  const onClickForm = () => {
    showFormNewProject();
  }

  return (
    <>
    <button
      type="button"
      className="btn btn-block"
      onClick={ onClickForm }
      >
        Nuevo proyecto
    </button>

    { newProjectForm ? (
      <form
        className="formulario-nuevo-proyecto"
        onSubmit={handleSubmitProject}
        >
        <input
          type="text"
          className="input-text"
          placeholder="Nombre del proyecto"
          name="name"
          onChange={handleChangeProject}
          value={name}
        />

        <input
          type="submit"
          className="btn btn-primario btn-block"
          value="Agregar proyecto"
        />
      </form>
    ) :
      null
    }

    {
      formError ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) :
      null
    }
    
    </>
  );
};

export default NewProject;
