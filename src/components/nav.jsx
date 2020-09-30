import React from "react";
import { useApi } from "./context";
import styled from "styled-components";
import { styles } from "./utilities";
import { Logout } from "@styled-icons/heroicons-outline/Logout";
import { ViewList } from "@styled-icons/bootstrap/ViewList";

export default function LoadingCalender() {
  const handleLogout = useApi().logOut;
  const btnText = useApi().pageViewState;
  const toggle = useApi().togglePage;

  return (
    <>
      <Wrapper>
        <Title>School Timetable - ACK St Peters Academy</Title>
        <ToggleButton onClick={toggle}>
          {btnText}
          {"  "}
          <ViewList size="30" />
        </ToggleButton>
        <Button onClick={handleLogout}>
          Logout{"  "}
          <Logout size="30" />
        </Button>
      </Wrapper>
    </>
  );
}

const ToggleButton = styled.button`
  ${styles.fonts.bodyFont};
  font-size: 1em;
  background: white;
  border: 0;
  color: #000;
  gap: 20px;
  letter-spacing: 2px;
  float: right;
  padding: 5px 20px;
  margin: 5px;
  outline: none;
  

  &:hover {
    cursor: pointer;
    background: #ddd;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h1`
  ${styles.fonts.bodyFont};
  font-size: 1.5em;
  padding: 0 0 0 5%;
  color: #ffe;
  letter-spacing: 2px;
  font-weight: 500;

  ${styles.deviceSize.mobile} {
    display: none;
  }
`;

const Button = styled.button`
  ${styles.fonts.bodyFont};
  font-size: 1em;
  background: #e04006;
  border: 0;
  color: white;
  gap: 20px;
  letter-spacing: 2px;
  float: right;
  padding: 5px 20px;
  margin: 5px;
  outline: none;

  &:hover {
    cursor: pointer;
    background: #c02006;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);
  }
`;

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
  background-color: #4b0082;
`;
