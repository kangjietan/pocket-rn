import React, { useEffect, useState } from "react";
import {
  AppointmentContainer,
  AppointmentDateTime,
  AppointmentOverlay,
  AppointmentsContainer,
  AppointmentSender,
  AppointmentsList,
  AppointmentStatus,
  AppointmentDescription,
  PendingButton,
  ButtonContainer,
  ButtonList,
  ButtonListItem,
  DeleteAppointmentButton,
} from "./styles";

import {
  Appointment as AppointmentInterface,
  updateAppointmentStatus,
  deleteAppointment,
} from "../../../sdk";

interface Props {
  userID: string;
  userEmail: string;
  setAppointmentsList: React.Dispatch<
    React.SetStateAction<AppointmentInterface[]>
  >;
  list: AppointmentInterface[];
}

const buttonStatus = (status: number) => {
  if (status === 0) return "Pending";
  if (status === 1) return "Accepted";
  if (status === 2) return "Declined";
};

const Appointments: React.FunctionComponent<Props> = ({
  userID,
  list,
  userEmail,
  setAppointmentsList,
}) => {
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);

  /** Set list to appointments */
  useEffect(() => {
    setAppointments(list);
  }, [list]);

  const updateStatus = (status: string, uid: string, code: number) => {
    /** Update appointment in database */
    updateAppointmentStatus(status, uid)
      .then((response) => {
        if (response.data) {
          const updatedList: AppointmentInterface[] = list.map(
            (appointment) => {
              if (appointment.uid === uid) {
                return Object.assign({}, appointment, { status: code });
              } else {
                return appointment;
              }
            }
          );

          /** Update current list to reflect changes in database */
          setAppointmentsList(updatedList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteAppointment = (uid: string) => {
    /** Delete appointment */
    deleteAppointment(uid).then((response) => {
      if (response.data) {
        let updatedList: AppointmentInterface[] = [];

        for (let i = 0; i < list.length; i++) {
          const appointment = list[i];
          if (appointment) {
            if (appointment.uid === uid) {
              updatedList = [...list.slice(0, i), ...list.slice(i + 1)];
              break;
            }
          }
        }

        /** Update current list to reflect changes in database */
        setAppointmentsList(updatedList);
      }
    });
  };

  return (
    <AppointmentsContainer>
      <h1>Appointments</h1>
      <AppointmentsList>
        {appointments.map((appointment: AppointmentInterface, idx) => {
          const {
            senderEmail,
            receiverEmail,
            description,
            scheduledTime,
            status,
            uid,
          } = appointment;

          let buttonState = buttonStatus(status);

          const date = new Date(scheduledTime);
          /** Thu, Apr 29, 2021 */
          const dateString = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
          /** 9:00 PM */
          const timeString = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          });

          return (
            <AppointmentContainer key={idx}>
              <AppointmentOverlay />
              <DeleteAppointmentButton
                onClick={() => handleDeleteAppointment(uid)}
              >
                &#10005;
              </DeleteAppointmentButton>
              <AppointmentDateTime>
                <h2>{dateString}</h2>
                <h2>{timeString}</h2>
              </AppointmentDateTime>
              <AppointmentDescription>
                <AppointmentSender>
                  {/* If appointment sender email is the same as logged in user. Render receiver email instead. */}
                  <h2>
                    {senderEmail === userEmail ? receiverEmail : senderEmail}
                  </h2>
                </AppointmentSender>
                <p>{description}</p>
              </AppointmentDescription>
              <AppointmentStatus>
                <ButtonContainer>
                  <PendingButton status={status}>{buttonState}</PendingButton>
                  {/* Do not render the dropdown menu if appointment was already declined */}
                  {status === 2 ? null : (
                    <ButtonList status={status}>
                      {/* Do no render if appointment has already been accepted */}
                      {status === 1 ? null : (
                        <ButtonListItem
                          onClick={() => updateStatus("ACCEPTED", uid, 1)}
                        >
                          Accept
                        </ButtonListItem>
                      )}
                      <ButtonListItem
                        onClick={() => updateStatus("DECLINED", uid, 2)}
                      >
                        Decline
                      </ButtonListItem>
                    </ButtonList>
                  )}
                </ButtonContainer>
              </AppointmentStatus>
            </AppointmentContainer>
          );
        })}
      </AppointmentsList>
    </AppointmentsContainer>
  );
};

export default Appointments;
