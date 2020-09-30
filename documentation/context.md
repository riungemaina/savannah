# Context.jsx

First up is the export, instead of having to import `useContext` in each component that needs context I exported a function that provides the use context hook like so

```JavaScript
export function useApi() {
  return useContext(ApiContext);
}
```

This allows me to just import `useApi` then access context is methods as simple as

```JavaScript
const handleLogin = useApi().signIn;
```

The APIContext provider gives us access to the following values

```JavaScript
    <ApiContext.Provider value={{ logOut, signIn, isSignedInState, getEvents, pageViewState, loadingCalender, calenderId, togglePage ,}}>
```

## Helper Functions

### Loading GAPI

Once the script is loaded by the browser in the `public/index.html` file the following functions are called to initialize it.
The Google API is initialized by the following function

```JavaScript
  window.startGapi = function () {
    window.gapi.load("client:auth2", init);
  };
```

The init function looks like this

```JavaScript
  const init = async () => {
    try {
      await window.gapi.client.init({
        apiKey: "The API Key from Developers Console",
        clientId:
          "The ClientID from the Developers Console",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar",
      });
      window.gapi.auth2
        .getAuthInstance()
        .isSignedIn.listen((isSignedIn) => updateSignInStatus(isSignedIn));

      updateSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    } catch (e) {
      throw new Error(`Cannot connect with google calendar API. ${e}`);
    }
  }
```

## Making API Requests

The make request function looks like this

```JavaScript
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

```

The function calls a `get token` function that will get the access token from `GAPI` for the currently logged in user like so

```JavaScript
  const getToken = async () => {
    const authInstance = await window.gapi.auth2.getAuthInstance();
    const { token_type, access_token } = authInstance.currentUser.le.wc;
    return [token_type, access_token];
  };
```

## The Values

### logOut

The logout function is called by the logout control at the navbar, the function makes a call to `GAPI Auth2` like so

```JavaScript
  const logOut = async () => {
    await window.gapi.auth2.getAuthInstance().signOut();
    updateSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    setCalenderId(null);
    setPageViewState(null);
  };
```

After logout the function updates `state` with the `login status`

### signIn

The signin function is called by the auth component to authenticate the user it makes a call to `GAPI Auth2` like so

```JavaScript
  const signIn = async () => {
    await window.gapi.auth2.getAuthInstance().signIn();
  };
```

### isSignedInState

The signedInState passes the login status of the user, its used in the App.JS component to control render. It is State set throughout the context by various functions.

### getEvents

This value provides the users events from their Calender, the function gets the events GAPI like so

```JavaScript
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
```

The function gets the events for the next seven days. This is particularly useful since in a timetable we want to show the next seven days of 'lessons'.

### pageViewState

This allows the user to toggle between different pages, its state updated by the `togglePage` function. The page view state will allow the `App.js` component to figure out which page the user is on.

### loadingCalender

This function finds the **ACK St Peters Calender** which is just a random name that can be changed to anything, if the calender exits its initialized and the `Calender State` set to the calender's id. if the calender does not exist the function calls a `createCalender` function that will create the calender it looks like this;

```JavaScript
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
```

The create calender will create a new calender with the given parameters the most important one being the **Summary** which is th calenders name and which the above function will check for, after the creation the function calls the `loadingCalender` function above to confirm that the calender was created, then initiate and open it.

```JavaScript
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
```

### calenderId

This gives access to the `calenderId` state set by the `loadingCalender` function, the state is used by the `addRecord.jsx` function to create events(lessons)

### togglePage

The toggle page function allows the user to switch the view from view calender to add lesson and vice-versa

```JavaScript
const togglePage = () => {
    if (pageViewState === "Show Timetable") {
      setPageViewState("Create New Lesson");
    } else setPageViewState("Show Timetable");
  };
```
