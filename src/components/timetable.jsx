import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { styles } from "./utilities";
import { useApi } from "./context";
import { LoadingTimetable, TimetableEmpty } from "./alert";

export default function LoadingCalender() {
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    loadLesson().then(function (result) {
      setLesson(result);
    });
  }, []);

  const loadLesson = useApi().getEvents;
  function classTime(time) {
    // the time returned by google is in UTC(0-z)
    // so we -3 to get the time in Africa/Nairobi

    if (/05:00/.test(time)) {
      return "8:00AM - 10:00AM";
    } else if (/07:00/.test(time)) {
      return "10:00AM - 12:00PM";
    } else if (/09:00/.test(time)) {
      return "12:00PM - 12:00AM";
    }
  }

  function weekDay(date) {
    const day = new Date(date).getDay();
    return day === 1
      ? "Monday"
      : day === 2
      ? "Teusday"
      : day === 3
      ? "Wednesday"
      : day === 4
      ? "Thursday"
      : day === 5
      ? "Friday"
      : "hmm🤔, seems to have an error";
  }

  function ShowView() {
    if (lesson !== null) {
      if (lesson.length === 0) {
        return <TimetableEmpty />;
      }
      return <ShowLessons />;
    }
    return <LoadingTimetable />;
  }

  function ShowLessons() {
    return (
      <>
        <Page>
          {lesson.map((lesson) => (
            <div key={lesson.id}>
              <Wrapper color={lesson.summary}>
                <Title>{lesson.summary}</Title>
                <Teacher>Teacher - {lesson.description}</Teacher>
                <Subject>
                  Subject - {lesson.extendedProperties.shared.subject}
                </Subject>
                <Weekday>Day - {weekDay(lesson.start.dateTime)}</Weekday>
                <Time>{classTime(lesson.start.dateTime)}</Time>
              </Wrapper>
            </div>
          ))}
          <div style={{ width: "230px", height: "0" }}></div>
          <div style={{ width: "230px", height: "0" }}></div>
          <div style={{ width: "230px", height: "0" }}></div>
        </Page>
      </>
    );
  }

  return (
    <>
      <ShowView />
    </>
  );
}
const handleBgColor = (color) => {
  switch (color) {
    case "Class 1":
      return "#008eff";
    case "Class 2":
      return "#e91e63";
    case "Class 3":
      return "#ff9800";
    default:
      return "#fff";
  }
};

const Page = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background: rgb(221 221 255 / 0.95);
  padding: 3%;
  padding-top: 3%;
  max-width: 1024px;
  margin: 0 Auto;
  border-left: #fff solid 2px;
  border-right: #fff solid 2px;
`;

const Wrapper = styled.div`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  letter-spacing: 2px;
  width: 230px;
  margin: 2%;
  border: 1px solid #008eff;
  border-radius: 3px;
  background-color: ${({ color }) => handleBgColor(color)};
  transition: background-color 0.28s ease, box-shadow 0.28s ease;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  &:hover {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);
  }

  p{
    padding 10px; 
    background-color: #fff;
      ${styles.fonts.bodyFont};
  }

`;
const Title = styled.h2`
  padding: 0.5em;
  background-color: transparent;
  text-align: center;
  color: white;
  transition: color 0.28s ease;
  ${styles.fonts.titleFont};
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
