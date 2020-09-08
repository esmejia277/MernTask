import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';


const Login = props => {

  // extract values from alert state
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, authenticated, login } = authContext;
  

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;


  useEffect(() => {
    if (authenticated) {
      props.history.push('/proyectos');
    }
    if (message) {
      showAlert(message.msg, message.category);
    }

  }, [message, authenticated, props.history]);
  
  
  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      showAlert('Todos los campos son obligatorios', 'alerta-error');
      return
    }
    login({ email, password })

  }
  
  return ( 
    <div className="form-usuario">
      { alert ? ( <div className={`alerta ${alert.category}`}> {alert.message } </div> ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
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
            <input
              type="submit" 
              className="btn btn-primario btn-block"
              value="Iniciar sesión"
            />
          </div>
        </form>
        <Link to="/nueva-cuenta" className="enlace-cuenta">
          Obtener cuenta
        </Link>
      </div>
    </div>
  );
}
 
export default Login;