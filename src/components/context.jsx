import React, { useContext, useState } from "react";
import { urls } from "./utilities";
// import { cloneDeep } from "lodash";

const ApiContext = React.createContext();
const ApiUpdateContext = React.createContext();

export function useApi() {
  return useContext(ApiContext);
}

export function useApiUpdate() {
  return useContext(ApiUpdateContext);
}

export function ApiProvider({ children }) {
  // Application States
  const [authState, setAuthState] = useState(null);
  const [isSignedInState, setIsSignedInState] = useState(false);
  // const [user, setUser] = useState(null);

  window.startGapi = function () {
    window.gapi.load("client:auth2", init);
  };

  const init = async () => {
    try {
      const auth = await window.gapi.auth2.init({
        clientId:
          "289048714237-ruictr0hr3ajo3qgpe3tlugcpajak8i7.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/calendar",
      });

      auth.isSignedIn.listen((isSignedIn) => updateSignInStatus(isSignedIn));
      updateSignInStatus(auth.isSignedIn.get());

      setAuthState(auth);
    } catch (e) {
      throw new Error(`Cannot connect with google calendar API. ${e}`);
    }
  };

  const updateSignInStatus = (isSignedIn) => {
    setIsSignedInState(isSignedIn);
  };

  const signIn = async () => {
    await authState.signIn();
  };

  const logOut = async () => {
    await authState.signOut();
    updateSignInStatus(authState.isSignedIn.get());
  };

  const getCalendarsList = async () => {
    const result = await makeRequest(urls.google.getCalendars);
    if (!result) {
      return [];
    }
    return result;
  };

  const getEvents = async (calendarId, dateMin, dateMax) => {
    const url = new URL(
      urls.google.getEvents.replace("#{calendarId}", calendarId)
    );
    url.search = new URLSearchParams({
      timeMin: dateMin,
      timeMax: dateMax,
    });
    const result = await makeRequest(url);
    if (!result) {
      return [];
    }
    return result;
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

  const getAuthInstance = async () => {
    return await window.gapi.auth2.getAuthInstance();
  };

  const getCurrentUser = async () => {
    const authInstance = await getAuthInstance();
    return authInstance.currentUser;
  };

  const getToken = async () => {
    const user = await getCurrentUser();
    const { token_type, access_token } = user.le.wc;
    return [token_type, access_token];
  };

  return (
    <ApiContext.Provider
      value={{
        logOut,
        signIn,
        isSignedInState,
        getCalendarsList,
        getEvents,
        makeRequest,
      }}
    >
      {/* <ApiUpdateContext> */} {children} {/* </ApiUpdateContext> */}{" "}
    </ApiContext.Provider>
  );
}
