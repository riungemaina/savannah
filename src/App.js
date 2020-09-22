import React from "react";
import Auth from "./components/auth.jsx";
import { useApi } from "./components/context";
import LoadingCalender from "./components/loadingCalender";

function App() {
  const isSignedIn = useApi().isSignedInState;
  const pageView = useApi().pageViewState;

  function ShowPage() {
    if (isSignedIn) {
      switch (pageView) {
        case "Loading":
          return <LoadingCalender />;
        case "ShowCalender":
          return <button>Login</button>;
        case "EditCalender":
          return <button>Login</button>;
        default:
          return <p>Error page</p>;
      }
    }
    return <Auth />;
  }

  return (
    <>
      <ShowPage />
    </>
  );
}

export default App;
