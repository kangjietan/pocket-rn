import styled from "styled-components";

export const NavContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  & a {
    color: white;
    text-decoration: none;
    font-size: 2rem;
  }

  & a:hover {
    color: #3aaf9f;
  }
`;
