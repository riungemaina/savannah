import React from "react";
import { useApi } from "./context";

export default function LoadingCalender() {
  const handleLogout = useApi().logOut;
  const getCalender = useApi().getCalendarsList();
  console.log(getCalender)
  return (
    <>
      <p>Loading Calender</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
