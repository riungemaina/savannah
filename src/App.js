import React from "react";
import Auth from "./components/auth.jsx";
import { useApi } from "./components/context";
import LoadingCalender from "./components/loadingCalender";
import Nav from "./components/nav";
import Timetable from "./components/timetable";
import AddRecord from "./components/addRecord";

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
      case "Create New Lesson":
        return <Timetable />;
      case "Show Timetable":
        return <AddRecord />;
      default:
        return <LoadingCalender />;
    }
  }

  return (
    <>
      <ShowPage />
      {/* <Nav />
      <Timetable /> */}
    </>
  );
}

export default App;
