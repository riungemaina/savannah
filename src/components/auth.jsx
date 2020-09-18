import React, { useState, useEffect } from "react";
import ApiCalendar from "react-google-calendar-api";
import styled from "styled-components";

const Auth = () => {
  const [login, setLogin] = useState(false);

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

  const SignInBtn = styled.button`
    visibility: ${(props) => (props.bg = true ? "hidden" : "visible")};
  `;
  const SignOutBtn = styled.button`
    visibility: ${(props) => (props.bg = false ? "hidden" : "visible")};
  `;

  return (
    <>
      <SignInBtn st={login} onClick={signIn}>
        sign-in
      </SignInBtn>
      <SignOutBtn st={login} onClick={signOut}>
        sign-out
      </SignOutBtn>
    </>
  );
};

export default Auth;
