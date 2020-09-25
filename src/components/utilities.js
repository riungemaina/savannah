export const styles = {
  fonts: {
    titleFont: `font-family: "Crimson Text", serif`,
    bodyFont: `font-family: 'Roboto', sans-serif;`,
  },
  deviceSize: {
    mobile: `@media (max-width: 425px)`,
    tablet: `@media (max-width: 768px)`,
    desktop: `@media (max-width: 1440px)`,
  },
};

export const urls = {
  google: {
    getCalendars:
      "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    getEvents:
      "https://www.googleapis.com/calendar/v3/calendars/#{calendarId}/events",
  },
};
