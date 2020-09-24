import React from "react";
import { useApi } from "./context";
import styled from "styled-components";
import { styles } from "./utilities";
import { Logout } from "@styled-icons/heroicons-outline/Logout";

export default function LoadingCalender() {
  const handleLogout = useApi().logOut;

  return (
    <>
      <Wrapper>
        <Button onClick={handleLogout}>
          Logout
          <Logout size="30" />
        </Button>  
      </Wrapper>
    </>
  );
}

const Button = styled.button`
  ${styles.fonts.bodyFont};
  font-size: 1em;
  background: #e04006;
  border: 0;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  letter-spacing: 2px;
  position: fixed;
  right: 0;
  padding: 5px 20px;
  margin 0 10px;

  &:hover {
    cursor: pointer;
    background: #c02006;
  }
`;

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
  height: 50px;
  background-color: indigo;
`;
