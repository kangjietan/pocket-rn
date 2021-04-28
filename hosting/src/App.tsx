import React, { useState } from "react";

import styled, { createGlobalStyle } from "styled-components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { logout } from "./sdk";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    font-family: 'Roboto', sans-serif;
  }

  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: #3aaf9f;
    }
  }

  html {
    scrollbar-width: thin;
    scrollbar-color: white black;
  }
  body::-webkit-scrollbar {
    width: 1rem;
  }
  body::-webkit-scrollbar-track {
    background: black;
  }
  body::-webkit-scrollbar-thumb {
    background-color: white;
    border: 3px solid black;
    border-radius: 10px;
  }
`;

const App: React.FunctionComponent = () => {
  const [displayName, setDisplayName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  /** Logout user */
  const handleLogout = () => {
    logout()
      .then((response) => {
        setUserLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Router>
      <Container>
        <GlobalStyle />
        <Nav setUserLoggedIn={setUserLoggedIn} userLoggedIn={userLoggedIn} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                {...props}
                setDisplayName={setDisplayName}
                setUserLoggedIn={setUserLoggedIn}
                setUserEmail={setUserEmail}
                setUserID={setUserID}
              />
            )}
          />
          <PrivateRoute
            path="/dashboard"
            isAuth={userLoggedIn}
            displayName={displayName}
            render={(props) => (
              <Dashboard
                {...props}
                isAuth={userLoggedIn}
                displayName={displayName}
                userEmail={userEmail}
                userID={userID}
                handleLogout={handleLogout}
              />
            )}
          />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
