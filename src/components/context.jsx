import React, { useContext, useState } from "react";
import { urls } from "./utilities";

const ApiContext = React.createContext();

export function useApi() {
  return useContext(ApiContext);
}

export function ApiProvider({ children }) {
  // Application States
  const [calenderId, setCalenderId] = useState("primary");
  const [isSignedInState, setIsSignedInState] = useState(false);
  const [pageViewState, setPageViewState] = useState(null);

  window.startGapi = function () {
    window.gapi.load("client:auth2", init);
  };

  const init = async () => {
    try {
      await window.gapi.client.init({
        apiKey: process.env.REACT_APP_API_KEY,
        clientId: process.env.REACT_APP_CLIENT_ID,
        discoveryDocs: [urls.google.discoveryDocs],
        scope: urls.google.scope,
      });
      window.gapi.auth2
        .getAuthInstance()
        .isSignedIn.listen((isSignedIn) => updateSignInStatus(isSignedIn));

      updateSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    } catch (e) {
      throw new Error(`Cannot connect with google calendar API. ${e}`);
    }
  };

  const loadingCalender = async () => {
    if (window.gapi.client.calendar.events !== undefined) {
      const calenders = await getCalendarsList();
      const SchoolCalender = calenders.find(
        ({ summary }) => summary === "ACK St Peters Timetable"
      );

      if (SchoolCalender == null) {
        createCalender();
      } else {
        setCalenderId(SchoolCalender.id);
        if (calenderId !== null && pageViewState === null) {
          setPageViewState("Create New Lesson");
        } else loadingCalender();
      }
      return SchoolCalender.id;
    }
  };

  const createCalender = async () => {
    await window.gapi.client.calendar.calendars.insert({
      resource: {
        summary: "ACK St Peters Timetable",
        description: "School Timetable",
        timezone: "Africa/Nairobi",
      },
    });
    loadingCalender();
  };

  const updateSignInStatus = (isSignedIn) => {
    setIsSignedInState(isSignedIn);
  };

  const signIn = async () => {
    await window.gapi.auth2.getAuthInstance().signIn();
  };

  const logOut = async () => {
    await window.gapi.auth2.getAuthInstance().signOut();
    updateSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    setCalenderId(null);
    setPageViewState(null);
  };

  const getCalendarsList = async () => {
    const result = await makeRequest(urls.google.getCalendars);
    if (!result) {
      return [];
    }
    return result;
  };

  const getEvents = async () => {
    const today = new Date();
    const sevenDaysFromNow = new Date(
      today.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    const events = await window.gapi.client.calendar.events.list({
      calendarId: calenderId,
      timeMin: today.toISOString(),
      timeMax: sevenDaysFromNow.toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: "startTime",
    });
    const items = events.result.items;
    if (!events.result.items) {
      return "no events";
    }
    return items;
  };

  const makeRequest = async (url) => {
    const [tokenType, token] = await getToken();
    const response = await fetch(url, {
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    });
    if (response.ok) {
      const json = await response.json();
      return json.items;
    } else {
      return null;
    }
  };

  const getToken = async () => {
    const authInstance = await window.gapi.auth2.getAuthInstance();
    const { token_type, access_token } = authInstance.currentUser.le.wc;
    return [token_type, access_token];
  };

  const togglePage = () => {
    if (pageViewState === "Show Timetable") {
      setPageViewState("Create New Lesson");
    } else setPageViewState("Show Timetable");
  };

  return (
    <ApiContext.Provider
      value={{
        logOut,
        signIn,
        isSignedInState,
        getEvents,
        pageViewState,
        loadingCalender,
        calenderId,
        togglePage,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
