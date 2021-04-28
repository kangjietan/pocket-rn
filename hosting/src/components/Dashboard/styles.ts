import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;

  & > button:first-child {
    display: inline-block;
    padding: 0.7em 1.4em;
    margin: 0 0.3em 0.3em 0;
    border-radius: 0.5em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    font-weight: 400;
    color: #ffffff;
    background-color: gray;
    box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
    text-align: center;
    position: relative;
    cursor: pointer;

    &:active {
      top: 0.1em;
    }
  }
`;

export const ToggleContainer = styled.div`
  margin-bottom: 1rem;

  & button {
    display: inline-block;
    padding: 0.7em 1.4em;
    margin: 0 0.3em 0.3em 0;
    border-radius: 0.5em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    font-weight: 400;
    color: #ffffff;
    background-color: gray;
    box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
    text-align: center;
    position: relative;
    cursor: pointer;

    &:active {
      top: 0.1em;
    }
  }
`;

export const ViewScheduleButton = styled.button``;

export const ViewAppointmentButton = styled.button``;

export const Container = styled.div``;
