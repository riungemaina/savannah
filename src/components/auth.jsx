import React, { useState, useEffect } from "react";
import ApiCalendar from "react-google-calendar-api";
import styled from "styled-components";

const Auth = () => {
  const [login, setLogin] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      isSignedIn();
    }, 2000);
    return () => clearInterval(interval);
  });

  function signIn() {
    ApiCalendar.handleAuthClick();
  }

  function signOut() {
    ApiCalendar.handleSignoutClick();
  }

  function isSignedIn() {
    setLogin(ApiCalendar.sign);
  }

  function LoginStatus(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <SignOutBtn onClick={signOut}>Sign Out</SignOutBtn>;
    }
    return <SignInBtn onClick={signIn}>Sign In</SignInBtn>;
  }

  const SignInBtn = styled.button``;

  const SignOutBtn = styled.button``;

  function consoleLog() {
    console.log(ApiCalendar.listUpcomingEvents);
  }

  return (
    <>
      <LoginStatus isLoggedIn={login} />
      <button onClick={consoleLog}>hey</button>
    </>
  );
};

export default Auth;
