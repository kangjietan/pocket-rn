import styled, { css } from "styled-components";

interface ButtonStatusProps {
  status: number;
}

export const AppointmentsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AppointmentsList = styled.div`
  max-width: 1024px;
`;

export const AppointmentContainer = styled.div`
  position: relative;
  display: flex;
  padding: 1.5rem;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

export const AppointmentOverlay = styled.div`
  position: absolute;
  background: white;
  top: 0;
  left: 0;
  opacity: 10%;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  z-index: -1;
`;

export const AppointmentDateTime = styled.div`
  margin-right: 2rem;
`;

export const AppointmentDescription = styled.div`
  margin-right: 2rem;

  & p {
    max-width: 576px;
    max-height: 15rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 1rem;
    }
    &::-webkit-scrollbar-track {
      background: black;
    }
    &::-webkit-scrollbar-thumb {
      background-color: white;
      border: 3px solid black;
      border-radius: 10px;
    }
  }
`;

export const AppointmentSender = styled.div``;

export const AppointmentStatus = styled.div`
  margin-top: 1rem;
`;

export const ButtonContainer = styled.div`
  position: relative;
`;

export const PendingButton = styled.button`
  display: inline-block;
  padding: 0.5em 3em;
  margin: 0 0.3em 0.3em 0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  text-align: center;
  transition: all 0.15s;
  border-radius: 5px;
  font-size: 1rem;

  ${(props: ButtonStatusProps) => {
    const { status } = props;
    let color;
    let hoverColor;
    if (status === 0) {
      color = "rgb(51, 162, 255)";
      hoverColor = "rgb(0, 84, 174)";
    }
    if (status === 1) {
      color = "rgb(32, 134, 55)";
      hoverColor = "rgb(26, 109, 45)";
    }
    if (status === 2) {
      color = "rgb(165, 29, 42)";
      hoverColor = "rgb(160, 28, 41)";
    }

    return css`
      border: 0.16em solid ${color};
      color: white;
      background-color: ${color};
      cursor: ${status === 2 ? "auto" : "pointer"};

      &:hover {
        background-color: ${hoverColor};
      }
    `;
  }}
`;

export const ButtonList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  position: absolute;
  margin-top: 10px;
  padding: 0;
  width: 225px;
  height: ${(props: ButtonStatusProps) =>
    props.status === 1 ? "50px" : "100px"};
  border-radius: 5px;
  transition: all 0.4s ease;
  transform: translateY(-10px);
  opacity: 0;
  visibility: hidden;

  ${PendingButton}:focus + & {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
`;

export const ButtonListItem = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: lightslategray;
  border-radius: 0 0 5px 5px;

  &:first-child {
    border-bottom: 1px solid white;
    border-radius: 5px 5px 0 0;
  }

  &:hover {
    background-color: gray;
  }
`;

export const DeleteAppointmentButton = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  margin: 7px 0px 0px 7px;
  cursor: pointer;
`;
