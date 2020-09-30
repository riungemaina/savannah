# AddRecord

Of all the components in this project this one has the most logic the most functionality, that is mostly because it does almost everything that it needs done itself, ie sending the recorded Lesson details to the Google calender and setting off the various alerts that go with the user actions in the page.
The component has these states

```JavaScript
  const [grade, setGrade] = useState("");
  const [teacher, setTeacher] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [calId, setCalId] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  var lesson = {
    summary: `${grade}`,
    description: `${teacher}`,
    start: {
      dateTime: `${weekDay + startTime}`,
      timeZone: "Africa/Nairobi",
    },
    end: {
      dateTime: `${weekDay + endTime}`,
      timeZone: "Africa/Nairobi",
    },
    recurrence: ["RRULE:FREQ=WEEKLY;COUNT=52"],
    reminders: {
      useDefault: true,
    },
    extendedProperties: {
      shared: {
        subject: `${subject}`,
      },
    },
  };
```

The variable `Lesson` uses the state values instead of having its values set by the form. The form sets the state or at least initiates the logic that does then during post, the `Lesson` var will read the various values of these states.
The `calId` & `alertMsg` states are used to get the calender Id needed during post and to setoff the appropriate alert message respectively.

## Alerts

The alert Logic is handled like so

```JavaScript
  function Alert() {
    switch (alertMsg) {
      case "Creating":
        return <CreatingLesson />;
      case "Created":
        setTimeout(ClearAlert, 6000);
        return <LessonCreated />;
      case "Error":
        setTimeout(ClearAlert, 6000);
        return <Error />;
      default:
        return "";
    }
  }

  function ClearAlert() {
    setAlertMsg("");
  }
```

Once the alert is initiated, as the data is sent over to Google, a `creating` alert is set off, the alert then listens for the created or error states, shows either depending on the outcome then sets a timer that will reset the alert state and clear the alert after 6 seconds.

## Getting the Date and Time from the Form

In the form the user only enters the Weekday [Mon-Fri] and the time as say [10:00] these values need to be converted to match the **ISO 8601** date format that Google Calender uses and needs to create events. The functions that handle this are described below.

```JavaScript
function getWeekDay(day) {
    const dayOfWeek = getDayOfWeek(day);
    const date = new Date();
    const diff = date.getDay() - dayOfWeek;
    if (diff >= 0) {
      date.setDate(date.getDate() + (7 - diff));
    } else if (diff < 0) {
      date.setDate(date.getDate() + -1 * diff);
    }
    const month = date.getMonth() + 1;
    setWeekDay(date.getFullYear() + "-" + month + "-" + date.getDate());
  }

  // Helper Functions

function getDayOfWeek(day) {
  return day === "Monday"
    ? 1
    : day === "Tuesday"
    ? 2
    : day === "Wednesday"
    ? 3
    : day === "Thursday"
    ? 4
    : day === "Friday"
    ? 5
    : 1;
}
```

The function takes in day say `Monday` calls the `getDayOfWeek` function which returns the weekday as a number then minus that from todays date then evaluate that to find the next occurring Monday, then get its `year, month and date` in that format which we'll then append to the time the user entered for the class. **ProTip** you need to add one to the month value since Javascript starts counting from zero, meaning `Jan = 0, Feb = 1... Dec = 11`. To convert the time we do...

```JavaScript
  function getTime(startTime) {
    return startTime === "8:00 AM"
      ? setTime("T08:00:00+03:00", "T10:00:00+03:00")
      : startTime === "10:00 AM"
      ? setTime("T10:00:00+03:00", "T12:00:00+03:00")
      : startTime === "12:00 PM"
      ? setTime("T12:00:00+03:00", "T14:00:00+03:00")
      : null;
  }

  function setTime(startTime, endTime) {
    setStartTime(startTime);
    setEndTime(endTime);
  }
```

Both functions are called in the form by an `onChange` event and the value that was entered by the user passes as the functions argument.

## Creating Events

To kick off the process the app loads the calender id after Render and sets the `calId` state like so

```JavaScript
 useEffect(() => {
    loadCalender();
  }, []);

  const loadCalender = useApi().loadingCalender;

  loadCalender().then(function (result) {
    setCalId(result);
  });
```

After that the handle submit listens for when the user clicks the submit button and when that happens the `createEvent` function is called like so

```JavaScript
  const HandleSubmit = (evt) => {
    evt.preventDefault();
    createEvent(lesson);
    evt.target.reset();
  };

  const createEvent = async (lesson) => {
    setAlertMsg("Creating");
    try {
      await window.gapi.client.calendar.events
        .insert({
          calendarId: `${calId}`,
          resource: lesson,
        })
        .then(function (result) {
          if (result.status === 200) {
            setAlertMsg("Created");
          }
        });
    } catch (err) {
      setAlertMsg("Error");
    }
  };
```

The `createEvent` function sets off the `creating` alert then tries to send the value of the `Lesson` var to Google, if the status of the result is **200** (which means success) then it triggers a `Created` alert. In case of any errors it triggers the `Error` alert.
