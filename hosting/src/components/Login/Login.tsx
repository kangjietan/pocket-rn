import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
  LoginContainer,
  Title,
  Form,
  InputField,
  Input,
  LoginButton,
  ErrorContainer,
  Error,
  Overlay,
  Container,
} from "./styles";

import { login } from "../../sdk";

interface Props {
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FunctionComponent<Props> = ({
  setDisplayName,
  setUserLoggedIn,
  setUserEmail,
  setUserID,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorsList, setErrorsList] = useState<string[]>([]);

  const history = useHistory();

  /** Update input text */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  /**
   * Validate form fields.
  */
  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: string[] = [];

    // If fields are not all filled out
    if (!email || !password) {
      errors.push("Please fill out all fields");
    }

    // check password strength
    if (password.length < 6) {
      errors.push("Password needs to be at least 6 characters");
    }

    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      login(email, password)
        .then((response) => {
          // Set state on login
          setDisplayName(response.displayName);
          setUserEmail(response.email);
          setUserID(response.uid);
          setUserLoggedIn(true);
          // Redirect to login if succesfully registered
          history.push("/dashboard");
        })
        .catch((error) => {
          // Render errors
          setErrorsList([error.message]);
        });
    }
  };

  return (
    <LoginContainer>
      <Container>
        <Overlay />
        <Title>Login</Title>
        <Form onSubmit={handleFormSubmission}>
          <InputField>
            <Input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleInputChange}
            />
          </InputField>
          <InputField>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleInputChange}
            />
          </InputField>
          <ErrorContainer>
            {errorsList.map((error: string, idx: number) => (
              <Error key={idx}>{error}</Error>
            ))}
          </ErrorContainer>
          <LoginButton type="submit">Login</LoginButton>
        </Form>
      </Container>
    </LoginContainer>
  );
};

export default Login;
