import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const Container = styled.div`
  text-align: center;
`;

const Home: React.FunctionComponent = () => {
  return (
    <Container>
      <h1>HOW TO GET STARTED!</h1>
      <Link to="/register">
        <h2>1. Register an account</h2>
      </Link>
      <Link to="/login">
        <h2>2. Login into your account</h2>
      </Link>
      <Link to="/dashboard">
        <h2>3. Search for people to schedule an appointment by email</h2>
        <h2>4. View appointments and choose to accept or decline them</h2>
      </Link>
    </Container>
  );
};

export default Home;
