import React from "react";

import { NavContainer } from "./styles";

import { Link } from "react-router-dom";

interface Props {
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userLoggedIn: boolean;
}

const Nav: React.FunctionComponent<Props> = ({
  setUserLoggedIn,
  userLoggedIn,
}) => {
  return (
    <NavContainer>
      <Link to="/">Home</Link>
      <Link to="register">Register</Link>
      <Link to="/login">Login</Link>
      {userLoggedIn ? <Link to="/dashboard">Dashboard</Link> : null}
    </NavContainer>
  );
};

export default Nav;
