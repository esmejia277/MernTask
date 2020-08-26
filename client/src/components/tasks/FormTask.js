import React from 'react';

const FormTask = () => {
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