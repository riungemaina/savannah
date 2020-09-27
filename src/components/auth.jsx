import React from "react";
import { useApi } from "./context";
import styled from "styled-components";
import { styles } from "./utilities";
import { Google } from "@styled-icons/boxicons-logos/Google";

export default function LoginScreen() {
  const handleLogin = useApi().signIn;

  return (
    <>
      <Container>
        <Wrapper>
          <Title>ACK St Peters Academy</Title>
          <Description>School Timetable</Description>
          <Button onClick={handleLogin}>
            Login
            <Google size="30" />
          </Button>
        </Wrapper>
      </Container>
    </>
  );
}

// Styled Components Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Wrapper = styled.div`
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
  background: #ddf;
  border-radius: 2px;

  ${styles.deviceSize.mobile} {
    padding: 40px 0;
    max-width: 95%;
    font-size: 15px;
  }
`;

const Title = styled.h1`
  ${styles.fonts.titleFont};
  font-size: 3em;
`;

const Description = styled.h3`
  ${styles.fonts.bodyFont};
  font-size: 2em;
  padding: 20px 0;
  letter-spacing: 2px;
`;

const Button = styled.button`
  width: 75%;
  ${styles.fonts.bodyFont};
  margin: 30px 0 0 0;
  font-size: 1.5em;
  background: #4caf50;
  border: 0;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 20px;
  letter-spacing: 2px;

  &:hover {
    cursor: pointer;
    background: #2c8f30;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
  }
`;
