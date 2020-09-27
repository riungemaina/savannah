import React from "react";
import styled from "styled-components";
import { styles } from "./utilities";

export function CreatingLesson() {
  return (
    <>
      <CreatingWrap>
        <p>Hold on a Sec, we're Creating the Lesson</p>
      </CreatingWrap>
    </>
  );
}

export function LessonCreated() {
  return (
    <>
      <CreatedWrap>
        <p>Success, lesson Created</p>
      </CreatedWrap>
    </>
  );
}

export function LoadingTimetable() {
  return (
    <>
      <AlertWrap>
        <p>Hold on a sec, we're Loading the Timetable</p>
      </AlertWrap>
    </>
  );
}

export function TimetableEmpty() {
  return (
    <>
      <AlertWrap>
        <p>you have no lessons click create start creating events</p>
      </AlertWrap>
    </>
  );
}

const CreatedWrap = styled.div`
  ${styles.fonts.bodyFont};
  width: 95%;
  width: fit-content;
  position: sticky;
  margin: 10px 10px 10px auto;
  text-align: right;
  background-color: rgb(255 255 255 / 0.9);
  padding: 12px 55px;
  top: 10px;
  border: #8bc34a solid 2px;
  border-radius: 4px;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 0 1px 0 rgb(139 195 74 / 0.2), 0 2px 2px 0 rgb(139 195 74 / 0.2);
`;

const CreatingWrap = styled.div`
  ${styles.fonts.bodyFont};
  width: 95%;
  width: fit-content;
  position: sticky;
  margin: 10px 10px 10px auto;
  text-align: right;
  background-color: rgb(255 255 255 / 0.9);
  padding: 12px 55px;
  top: 10px;
  border: #ffc107 solid 2px;
  border-radius: 4px;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 0 1px 0 rgb(255 152 0 / 0.2), 0 2px 2px 0 rgb(255 152 0 / 0.2);
`;

const AlertWrap = styled.div`
  ${styles.fonts.bodyFont};
  width: 100%;
  position: absolute;
  text-transform: uppercase;
`;
