import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Settings } from "@styled-icons/feather/Settings";
import { styles } from "./utilities";
import { useApi } from "./context";

export default function LoadingCalender() {
  const loadCalender = useApi().loadingCalender;

  useEffect(() => {
    loadCalender();
  });

  return (
    <>
      <Container>
        <Rotate>
          <Settings size="70" />
        </Rotate>
        <Description>Loading Calender...</Description>
      </Container>
    </>
  );
}

const Description = styled.p`
  ${styles.fonts.bodyFont};
  font-size: 2em;
  padding: 20px 0;
  letter-spacing: 2px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
`;

const Rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const Rotate = styled.div`
  width: fit-content;
  animation: ${Rotation} 2s infinite linear;
`;
