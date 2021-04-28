import React, { useEffect, useState } from "react";

import Schedule from "./Schedule/Schedule";
import Appointments from "./Appointments/Appointments";

import {
  Container,
  DashboardContainer,
  ToggleContainer,
  ViewAppointmentButton,
  ViewScheduleButton,
} from "./styles";

import {
  getAppointments,
  Appointment as AppointmentInterface,
} from "../../sdk";

interface Props {
  isAuth: boolean;
  displayName: string;
  userEmail: string;
  userID: string;
  handleLogout: () => void;
}

const Dashboard: React.FunctionComponent<Props> = ({
  isAuth,
  displayName,
  userEmail,
  userID,
  handleLogout,
}) => {
  const [viewAppointments, setViewAppointments] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState<
    AppointmentInterface[]
  >([]);

  /** Retrieve user list of appointments */
  const loadAppointments = () => {
    getAppointments(userID)
      .then((response) => {
        if (response.data) {
          setAppointmentsList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /** Get appointments on component mount */
  useEffect(() => {
    loadAppointments();
  }, []);

  /** Show selected option. Schedule appointments or view appointments. */
  const option = viewAppointments ? (
    <Appointments
      userID={userID}
      list={appointmentsList}
      userEmail={userEmail}
      setAppointmentsList={setAppointmentsList}
    />
  ) : (
    <Schedule
      userEmail={userEmail}
      userID={userID}
      loadAppointments={loadAppointments}
    />
  );

  return (
    <DashboardContainer>
      {isAuth ? (
        <button
          onClick={handleLogout}
          style={{ border: "none", padding: "1rem", borderRadius: "5px" }}
        >
          Logout
        </button>
      ) : null}
      <h1>{"Welcome, " + displayName}</h1>
      <ToggleContainer>
        <ViewScheduleButton onClick={() => setViewAppointments(false)}>
          Schedule Appointments
        </ViewScheduleButton>
        <ViewAppointmentButton onClick={() => setViewAppointments(true)}>
          View Appointments
        </ViewAppointmentButton>
      </ToggleContainer>
      <Container>{option}</Container>
    </DashboardContainer>
  );
};

export default Dashboard;
