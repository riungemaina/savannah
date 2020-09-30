import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Settings } from "@styled-icons/feather/Settings";
import { styles } from "./utilities";
import { useApi } from "./context";

export default function LoadingCalender() {
  const loadCalender = useApi().loadingCalender;

  useEffect(() => {
    loadCalender();
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          <Rotate>
            <Settings size="70" />
          </Rotate>
          <Description>
            Hang tight,
            <span role="img" aria-label="smile">
              😊
            </span>
            <br /> we're loading your calender...
          </Description>
        </Wrapper>
      </Container>
    </>
  );
}
const Wrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(16 16 48 / 0.95);
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
  color: #fff;
`;

const Description = styled.p`
  ${styles.fonts.bodyFont};
  font-size: 1.6em;
  padding: 20px 0;
  letter-spacing: 2px;
  text-align: center;
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
