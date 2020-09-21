import React from "react";
import { useApi } from "./context";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  transform: translateY(-2%);
`;

const LoginScreen = () => {
  const handleLogin = useApi().signIn;
  const handleIsIn = useApi().isSignedInState;

  return (
    <Container>
      <h1>Calendar Web Client</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleIsIn}>Login</button>
    </Container>
  );
};

export default LoginScreen;
