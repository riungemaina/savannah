import React, { useState } from "react";
import styled from "styled-components";
import { styles } from "./utilities";

export default function AddRecord() {
  const [grade, setGrade] = useState("");
  const [teacher, setTeacher] = useState("");
  const [startTime, setStartTime] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${(grade, teacher, startTime)}`);
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>Create a New Lesson</Title>
          <FormGroup>
            <label htmlFor="grade">Select the Class:</label>
            <select
              id="grade"
              onChange={(e) => setGrade(e.target.value)}
              required
            >
              <FirstOption />
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="teacher">Teacher's Name:</label>
            <select
              id="teacher"
              onChange={(e) => getWeekDay(e.target.value)}
              required
            >
              <FirstOption />
              <option>Mr Ballack</option>
              <option>Mrs Ruth</option>
              <option>Ms Alice</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="subject">Select the Subject</label>
            <select
              id="subject"
              onChange={(e) => getWeekDay(e.target.value)}
              required
            >
              <FirstOption />
              <option>Mathematics</option>
              <option>English</option>
              <option>Kiswahi</option>
              <option>Science</option>
              <option>Social Studies</option>
              <option>CRE</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="weekDay">Week Day [ Mon - Fri ]</label>
            <select
              id="weekDay"
              onChange={(e) => getWeekDay(e.target.value)}
              required
            >
              <FirstOption />
              <option>Monday</option>
              <option>Teusday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="time">Class Starts at:</label>
            <select
              id="time"
              onChange={(e) => getWeekDay(e.target.value)}
              required
            >
              <FirstOption />
              <option>8:00 AM</option>
              <option>10:00 AM</option>
              <option>12: 00 PM</option>
            </select>
          </FormGroup>
          <Button type="submit" value="Create Lesson" />
        </Form>
      </Container>
    </>
  );
}

const Title = styled.h1`
  ${styles.fonts.titleFont};
  font-size: 2.5em;
  text-align: center;
  border-bottom: 1px solid #999;
  width: fit-content;
  margin: 0 auto;
  padding: 0 20px;
`;

const FirstOption = styled.option`
  display: none;
`;

const Button = styled.input`
  font-size: 1.2em;
  letter-spacing: 2px;
  width: 100%;
  margin: 3rem 0;
  padding: 10px;
  cursor: pointer;
  background: #337ab7;
  border: 0;
  color: #fff;
  transition: background-color 0.28s ease, box-shadow 0.28s ease;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  &:hover {
    background: #135a97;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-top: 2.25rem;
  margin-bottom: 2.25rem;

  select {
    width: 100%;
    font-size: 1rem;
    height: 2rem;
    padding: 0.125rem 0.125rem 0.0625rem;
    background: none;
    line-height: 1.6;
    box-shadow: none;
    border-width: 0;
    border-bottom: 0.125rem solid #999;
    color: #e68900;
    outline: none;
  }

  label {
    position: relative;
    cursor: pointer;
    color: #333;
    display: block;
  }
`;

const Form = styled.form`
  ${styles.fonts.bodyFont};
  padding: 10px;
`;

const Container = styled.div`
  position: relative;
  max-width: 35rem;
  margin: 3rem auto;
  background: #fff;
  padding: 3rem 5rem 0;
  border-radius: 1px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
    transform: scale(0.98);
    transition: transform 0.28s ease-in-out;
    z-index: -1;
  }

  &:hover::before {
    transform: scale(1);
  }
`;

// Helper Functions
function getDayOfWeek(day) {
  return day === "Monday"
    ? 1
    : day === "Teusday"
    ? 2
    : day === "Wednesday"
    ? 3
    : day === "Thursday"
    ? 4
    : day === "Friday"
    ? 5
    : 1;
}
function getWeekDay(day) {
  var dayOfWeek = getDayOfWeek(day);
  var date = new Date();
  var diff = date.getDay() - dayOfWeek;
  if (diff > 0) {
    date.setDate(date.getDate() + (7 - diff));
  } else if (diff < 0) {
    date.setDate(date.getDate() + -1 * diff);
  }
  console.log(
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
    date.toISOString()
  );
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}
