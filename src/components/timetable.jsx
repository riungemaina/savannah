import React from "react";
import styled from "styled-components";
import { styles } from "./utilities";
// import Alert from "./alert"
// import AddRecord from "./addRecord"

export default function LoadingCalender() {
  return (
    <>
      {/* <Alert />
      <AddRecord/> */}
      <Wrapper>
        <Title>Class 1</Title>
        <Teacher>Teacher - Ms Alice</Teacher>

        <Subject>Subject - Science</Subject>

        <Weekday>Day - Monday</Weekday>

        <Time>Time - 8:00 AM - 10 AM</Time>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  ${styles.fonts.titleFont};
  letter-spacing: 2px;
    max-width: 18%;
  margin: 2%;
  border: 1px solid #008eff;
  background-color: #008eff;
  transition: background-color 0.28s ease, box-shadow 0.28s ease;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  &:hover {
    background: #fff;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);
  }
  &:hover h2 { color: #000; border-bottom: 1px solid #008eff;}

  p{ 
    padding 10px; 
    background-color: #fff;
  }

    ${styles.deviceSize.mobile} {
    max-width: 95%;
    margin: 5%;
  }
    ${styles.deviceSize.tablet} {
    max-width: 40%;
    margin: 5%;
  }
`;
const Title = styled.h2`
  padding: 0.5em;
  background-color: transparent;
  text-align: center;
  color: white;
  transition: color 0.28s ease;
`;
const Teacher = styled.p`
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #008eff;
`;
const Subject = styled.p`
  border-bottom: 1px solid #008eff;
`;
const Weekday = styled.p`
  border-bottom: 1px solid #008eff;
`;
const Time = styled.p``;
