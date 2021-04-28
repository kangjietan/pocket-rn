import React from "react";

import { Redirect, Route, RouteComponentProps } from "react-router-dom";

interface StaticContext {
  statusCode?: number;
}

interface Props {
  isAuth: boolean;
  path: string;
  displayName: string;
  render: (
    props: RouteComponentProps<{}, StaticContext, unknown>
  ) => React.ReactNode;
}

/**
 * Redirect to component if user is logged in.
 */
const PrivateRoute: React.FunctionComponent<Props> = (props) => {
  const { isAuth } = props;

  return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
