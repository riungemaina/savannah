This project was created as an interview assessment for [Savannah Informatics](http://savannahinformatics.com/).

## Documentation

This documentation will provide an overview into the project, how things run and the decisions made at each step. The documentation gives the general functionality of each function in the components skipping the Layout & JSX plus the Styling which is done in Styled Components.

##### What the app does;

The app is supposed to help teachers schedule lessons and prepare the timetable

##### My Implementation

On Launching the app, you go to a login page (if you are not logged in already), the app logs you in via Google, asking for the permission to your calendar...
The app then looks for the Timetable calendar and creates it if it does not exist, if it exists it is opened and the user is taken to a second page which displays the timetable.
From there the user can then toggle between viewing the timetable and creating new lessons.
Delightfully the app uses ReactJS

##### Dependencies

The app uses styled-components and styled icons which are not discussed in this documentation, styled icons are pretty easy to implement and styled-components are just regular CSS or SCSS.

## Contents

1. [The Files & Components](#the-files-&-components)
2. [The Google Calender API](#the-google-api)
3. The code
   1. [App.js](#app.js)
   2. [components/auth.jsx](./documentation/auth.md)
   3. [components/context.jsx](./documentation/context.md)
   4. [components/timetable.jsx](./documentation)
   5. [components/addRecord.jsx](./documentation/addRecord.md)
   6. [components/nav.jsx](./documentation/nav.md)
   7. [components/utilities.js](./documentation/utilities.md)
   8. [components/alert.jsx](./documentation/alert.md)
4. [Some Functions I'm proud of](#some-functions-i-am-proud-of)

## The Files & Components

- **App.js** - handles the render logic by getting the page state from Context then showing the required page
- **components/utilities.js** - stores utilities such as the global styles (fonts, media queries) and the links
- **components/auth.jsx** - login page, handles Login logic by triggering a login function in Context
- **components/context.jsx** - the brains of the app, handles most of the global state & the general functions that update these states
- **components/nav.jsx** - the navbar, toggles pages & provides logout
- **components/timetable.jsx** - gets the events from context & displays them as the timetable
- **components/addRecord.jsx** - stand alone-ish component that adds lessons to the calender API, creates the Google events itself rather than using Context.
- **components/alert.jsx** - provides the general alerts, messages and notifications to the user following their actions

## The Google Api

The Google Api was by far the most challenging part of this assessment. They have very shallow documentation with a very small community. Its hard to get started but once I got it running, it run like a new v8.
The code is initialized in `public/index.html` like so;

```JavaScript
window.gapiLoaded = function () {
     startGapi()
   };
   (function (d, s, id) {
     var js,
       p = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {
       return;
     }
     js = d.createElement(s);
     js.id = id;
     js.src =
       'https://apis.google.com/js/platform.js?onload=gapiLoaded';
     p.parentNode.insertBefore(js, p);
   })(document, 'script', 'google-api-js');
```

The function loads GAPI then calls `startGapi` which will tell Context that GAPI is ready which inturn makes sure that everything starts after GAPI is ready.

# Some Functions I am proud of

## 1

**Problem** The Google API returns events in UTC but I need the time in UTC-3, The time returned is also a Date which is not very helpful since this is a calender, we need the weekday [Mon-Fri] and the time the class starts.

###### What the api returns

```
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
```

###### What we want

```
Day - Monday
Time - 8:00 AM - 10:00 AM
```

###### The Solution

```JavaScript
  function classTime(time) {
    // the time returned by google is in UTC(0-z)
    // so we -3 to get the time in Africa/Nairobi

    if (/05:00/.test(time)) {
      return "8:00AM - 10:00AM";
    } else if (/07:00/.test(time)) {
      return "10:00AM - 12:00PM";
    } else if (/09:00/.test(time)) {
      return "12:00PM - 12:00AM";
    }
  }
```

The function takes in time `(2015-05-28T09:00:00-07:00)` as its argument, evaluates the time using a regex then return the start and end time of the lesson;

## 2

**Problem** we need the user to input the Date of the Lesson but since its a timetable then we want it to be as simple as just entering `Monday` then we tell Google that that event should recur every Monday for a year, Google will only accept

```JavaScript
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
```

as the input so we need a way to convert `Monday` to the next occurring Monday then set the event to recur weekly

##### The solution

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
   setWeekDay(
     date.getFullYear() + "-" + month + "-" + date.getDate()
   );
 }

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

The function takes in day say `Monday` calls the `getDayOfWeek` function which returns the weekday as a number then minus that from todays date then evaluate that to find the next occurring Monday, then get its `year, month and date` in that format which we'll then append to the time the user entered for the class. **ProTip** you need to add one to the month value since Javascript starts counting from zero, meaning `Jan = 0, Feb = 1... Dec = 11`
