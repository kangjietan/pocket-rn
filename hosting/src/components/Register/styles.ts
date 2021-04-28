import styled from "styled-components";

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 350px;
  padding: 60px 45px;
`;

export const Overlay = styled.div`
  position: absolute;
  background: white;
  top: 0;
  left: 0;
  opacity: 10%;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

export const Title = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: #3aaf9f;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputField = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 12px;
  padding-left: 30px;
  border: 1px solid #eee;
  background: #eee;
  outline: none;
  transition: all 0.2s ease-in;
  ::placeholder {
    color: #1d2120;
  }
  &:focus {
    border: 1px solid #3aaf9f;
  }
`;

export const RegisterButton = styled.button`
  border: none;
  width: 70%;
  margin: 20px auto 0;
  background: #3aaf9f;
  text-align: center;
  padding: 12px;
  border-radius: 25px;
  z-index: 2;
  cursor: pointer;
  outline: none;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Error = styled.div`
  color: red;
`;
