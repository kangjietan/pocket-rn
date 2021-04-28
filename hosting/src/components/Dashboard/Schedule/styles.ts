import styled from "styled-components";

export const ScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1024px;
`;

export const SearchContainer = styled.div`
  text-align: center;
`;

export const SearchForm = styled.form`
  display: flex;
  position: relative;
  max-width: 30rem;
  width: 30rem;

  & input,
  & button {
    font-size: 1.2rem;
    border: 0;
    height: 3.5rem;
  }
`;

export const SearchBar = styled.input`
  outline: 0;
  width: 100%;
  padding: 0 1.6rem;
  border-radius: 0.7rem;
  appearance: none;
  transition: all 0.3s cubic-bezier(0, 0, 0.43, 1.49);
  transition-property: width, border-radius;
  position: relative;

  &:not(:placeholder-shown) {
    border-radius: 0.7rem 0 0 0.7rem;
    width: calc(100% - 6rem);
    + button {
      display: block;
      cursor: pointer;
    }
  }
`;

export const SearchLabel = styled.label`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
`;

export const SearchButton = styled.button`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 6rem;
  font-weight: bold;
  background: #3aaf9f;
  border-radius: 0 0.7rem 0.7rem 0;
`;

export const SearchResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const SearchResult = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  width: 576px;
  position: relative;
  padding: 1rem;
`;

export const SearchResultOverlay = styled.div`
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

export const UserName = styled.h2``;

export const UserEmail = styled.h2``;

export const ScheduleAppointmentButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background-color: #3aaf9f;
`;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: black;
`;

export const ModalButton = styled.div``;

export const ModalSchedule = styled.div`
  & h2 {
    color: white;
  }

  & > div input {
    height: 2rem;
    font-size: 1.25rem;
    cursor: pointer;
  }
`;

export const AppointmentDescription = styled.textarea`
  height: 10rem;
  width: 25rem;
`;

export const ModalTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

export const ModalTimePicked = styled.div`
  margin-bottom: 1rem;
`;

export const ModalScheduleTime = styled.button`
  padding: 1rem;
  cursor: pointer;
  border: none;
`;
