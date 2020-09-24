import React from "react";
import Auth from "./components/auth.jsx";
import { useApi } from "./components/context";
import LoadingCalender from "./components/loadingCalender";
import Nav from "./components/nav";

function App() {
  const isSignedIn = useApi().isSignedInState;
  const pageView = useApi().pageViewState;

  function ShowPage() {
    if (isSignedIn) {
      return (
        <>
          <Nav />
          <ShowView />
        </>
      );
    }
    return <Auth />;
  }

  function ShowView() {
    switch (pageView) {
      case "ShowCalender":
        return <button>Login</button>;
      case "EditCalender":
        return <button>Login</button>;
      default:
        return <LoadingCalender />;
    }
  }

  return (
    <>
      <ShowPage />
    </>
  );
}

export default App;
