import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
  RegisterContainer,
  Title,
  Form,
  InputField,
  Input,
  RegisterButton,
  ErrorContainer,
  Error,
  Overlay,
  Container,
} from "./styles";

import { register } from "../../sdk";

const Register: React.FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorsList, setErrorsList] = useState<string[]>([]);

  const history = useHistory();

  /** Field input handlers */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password2") {
      setPassword2(value);
    } else if (name === "fullname") {
      setFullName(value);
    }
  };

  /**
   * Perform validation on the form fields.
   * @param event Form submission.
   */
  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: string[] = [];

    // If fields are not all filled out
    if (!email || !fullName || !password || !password2) {
      errors.push("Please fill out all fields");
    }

    // check if password inputs match
    if (password !== password2) {
      errors.push("Password does not match.");
    }

    // check password strength
    if (password.length < 6) {
      errors.push("Password needs to be at least 6 characters");
    }

    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      register(fullName, email, password)
        .then((response) => {
          // Redirect to login if succesfully registered
          history.push("/login");
        })
        .catch((error) => {
          // Render errors
          setErrorsList([error.message]);
        });
    }
  };

  return (
    <RegisterContainer>
      <Container>
        <Overlay />
        <Title>Register Here</Title>
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
              type="text"
              name="fullname"
              placeholder="Enter name"
              value={fullName}
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
          <InputField>
            <Input
              type="password"
              name="password2"
              placeholder="Confirm password"
              value={password2}
              onChange={handleInputChange}
            />
          </InputField>
          <ErrorContainer>
            {errorsList.map((error: string, idx: number) => (
              <Error key={idx}>{error}</Error>
            ))}
          </ErrorContainer>
          <RegisterButton type="submit">Register</RegisterButton>
        </Form>
      </Container>
    </RegisterContainer>
  );
};

export default Register;
