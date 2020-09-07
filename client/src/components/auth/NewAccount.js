import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const NewAccount = props => {

  // extract values from alert state
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, authenticated, registerUser } = authContext;

  // if user is already authenticated, registered or duplicated
  useEffect(() => {
    if (authenticated) {
      props.history.push('/proyectos');
    }
    if (message) {
      showAlert(message.msg, message.category);
    }

  }, [message, authenticated, props.history]);


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
    // check if there are empty fields
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      showAlert('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    // check length of password > 6
    if (password.length < 6) {
      showAlert('El password debe ser de al menos 6 caracteres', 'alerta-error')
      return;
    }

    // check if password are equals
    if (password !== confirmPassword) {
      showAlert('Las contraseñas no coinciden', 'alerta-error');
      return;
    }

    registerUser({
      name,
      email,
      password
    });
  }
  
  return ( 
    <div className="form-usuario">
      { alert ? ( <div className={`alerta ${alert.category}`}> {alert.message } </div> ) : null}
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