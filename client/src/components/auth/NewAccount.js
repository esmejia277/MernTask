import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewAccount = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

  }
  
  return ( 
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>
        <form onSubmit={handleSubmit}>
        <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre"
              onChange={onChange}
              value={name}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmPassword">Confirma tu password</label>
            <input
              type="password"
              id="confirm"
              name="confirmPassword"
              placeholder="Repite tu password"
              onChange={onChange}
              value={confirmPassword}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit" 
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to="/" className="enlace-cuenta">
          Inicia sesión
        </Link>
      </div>
    </div>
  );
}
 
export default NewAccount;