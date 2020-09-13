import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Bar = () => {
  
  const authContext = useContext(AuthContext);
  const { user, logout, authenticatedUser } = authContext;

  useEffect( () => {
    authenticatedUser();
      
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      <p className="nombre-usuario">
        { user ? <span> Hola, {user.name} </span> : null}
      </p>
      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={ () => logout() }
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
 
export default Bar;