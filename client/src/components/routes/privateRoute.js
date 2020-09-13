import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

// Higher order component
// avoid the access to a component if the user is not logged
const PrivateRoute = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { loading, authenticated, authenticatedUser } = authContext;

  useEffect( () => {
    authenticatedUser();
    
    // eslint-disable-next-line
  }, [])

  return (
    <Route
      {...props}
      render={(props) =>
        !authenticated && !loading ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
