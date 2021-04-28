import React, { useState } from "react";
import {
  AppointmentDescription,
  ModalContainer,
  ModalSchedule,
  ModalScheduleTime,
  ModalTime,
  ModalTimePicked,
  ScheduleAppointmentButton,
  ScheduleContainer,
  SearchBar,
  SearchButton,
  SearchContainer,
  SearchForm,
  SearchLabel,
  SearchResult,
  SearchResultOverlay,
  SearchResults,
  UserEmail,
  UserName,
} from "./styles";

import Modal from "react-modal";
import Datetime from "react-datetime";

import moment from "moment";

import "react-datetime/css/react-datetime.css";

import {
  searchUsers,
  User as UserInterface,
  scheduleAppointment,
} from "../../../sdk";

Modal.setAppElement("#root");

interface Props {
  userEmail: string;
  userID: string;
  loadAppointments: () => void;
}

const modalStyles = {
  overlay: {
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "none",
  },
  content: {
    backgroundColor: "black",
    width: "35rem",
    height: "35rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "white",
  },
};

/** Valid dates starting from today */
const yesterday = moment().subtract(1, "day");
const validDates = function (current: moment.Moment) {
  return current.isAfter(yesterday);
};

const Search: React.FunctionComponent<Props> = ({ userEmail, userID, loadAppointments }) => {
  const [searchInput, setSearchInput] = useState(""); // User to search by email
  const [users, setUsers] = useState<UserInterface[]>([]); // Search results with users matching email
  const [scheduleTime, setScheduleTime] = useState(false); // Toggle schedule modal
  const [calendar, setCalendar] = useState<Date>(new Date()); // Calendar date
  const [scheduleEmail, setScheduleEmail] = useState(""); // Receiver email
  const [description, setDescription] = useState(""); // Appointment description
  const [errorsList, setErrorsList] = useState<string[]>([]);

  /** Event handlers - START */
  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchInput === userEmail) {
      setErrorsList(["Please try another email."]);
      return;
    }

    searchUsers(searchInput)
      .then((response) => {
        if (response.data.users.length > 0) {
          /** Set state with results */
          setUsers(response.data.users);
          setErrorsList([]);
        } else {
          setErrorsList(["No results. Please try another email."]);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleScheduleAppointment = () => {
    if (searchInput === userEmail) {
      setErrorsList(["Unable schedule appointment with current email."]);
      return;
    }

    scheduleAppointment(
      userID,
      userEmail,
      scheduleEmail,
      description,
      calendar.toString()
    )
      .then((response) => {
        /** Reset after scheduling appointment */
        setScheduleTime(false);
        setCalendar(new Date());
        setDescription("");
        /** Retrieve appointments */
        loadAppointments();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /** Event handlers - END */

  /**
   * Format Date object to [Day of the week] [Month] [Day] [Year] [Time].
   * 
   * Ex. Tue Apr 27 2021 9:12 PM
   * */
  const formattedTime = new Date(calendar)
    .toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
    .split(",")
    .join("");

  return (
    <ScheduleContainer>
      <SearchContainer>
        <SearchForm onSubmit={handleFormSubmission} role="search">
          <SearchLabel htmlFor="search">
            Schedule appointment with user
          </SearchLabel>
          <SearchBar
            id="search"
            type="search"
            name="searchInput"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search user by email"
            autoFocus
            required
          ></SearchBar>
          <SearchButton type="submit">Search</SearchButton>
        </SearchForm>
        {errorsList.map((error, idx) => (
          <p key={idx}>{error}</p>
        ))}
      </SearchContainer>
      <SearchResults>
        {users.map((user, idx) => (
          <SearchResult key={idx}>
            <SearchResultOverlay />
            <UserName>{user.username}</UserName>
            <UserEmail>{user.email}</UserEmail>
            <ScheduleAppointmentButton
              onClick={() => {
                setScheduleEmail(user.email);
                setScheduleTime(true);
              }}
            >
              Schedule
            </ScheduleAppointmentButton>
          </SearchResult>
        ))}
      </SearchResults>
      <Modal
        style={modalStyles}
        isOpen={scheduleTime}
        onRequestClose={() => setScheduleTime(false)}
        contentLabel="Schedule Modal"
      >
        <ModalContainer>
          <SearchResultOverlay />
          <ModalSchedule>
            <h2>Schedule Time with {scheduleEmail}</h2>
            <Datetime
              value={calendar}
              onChange={setCalendar as any}
              initialViewDate={calendar}
              isValidDate={validDates}
            />
          </ModalSchedule>
          <AppointmentDescription
            maxLength={1000}
            placeholder="Description..."
            name="description"
            value={description}
            onChange={handleTextAreaChange}
          ></AppointmentDescription>
          <ModalTime>
            <ModalTimePicked>{formattedTime}</ModalTimePicked>
            <ModalScheduleTime onClick={handleScheduleAppointment}>
              Schedule Time
            </ModalScheduleTime>
          </ModalTime>
        </ModalContainer>
      </Modal>
    </ScheduleContainer>
  );
};

export default Search;
