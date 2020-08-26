import React, { useState } from "react";

const NewProject = () => {

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
    //add to state
    //restart form
  }

  return (
    <>
    <button
      type="button"
      className="btn btn-block"
      >
        Nuevo proyecto
    </button>

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
    </>
  );
};

export default NewProject;
