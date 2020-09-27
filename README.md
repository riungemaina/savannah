This project was created as an interview assesment for [Savannah Informatics](http://savannahinformatics.com/).

## Documentation

This documentation will provide an overview into the project, how things run and the decisions made at each step.


**What the app does;**
The app is suppoed to help teachers schedule lessons and prepare the timetable

**My Implementation;**
On Launching the app, you go to a login page (if you are not logged in already), the app logs you in via Google, asking for the permission to your calendar...
The app then looks for the Timetable calendar and creates it if it does not exist, if it exists it is opened and the user is taken to a second page which displays the timetable.
From there the user can then toggle between viewing the timetable and creating new lessons.
Delightfully the app uses ReactJS

## Contents

1.  [The Files & Components](#the-files-&-components)
2. [The Google Calender API]
3. The code
	1. App.js
	2. components/utilities.js
	3. components/auth.jsx
	4. components/context.jsx
	5. components/nav.jsx
	6. components/timetable.jsx
	7. components/addRecord.jsx
	8. components/alert.jsx


## The Files & Components

- **App.js** - handles the render logic
- **components/utilities.js** - stores utilities such as the global styles (fonts, media queries) and the links
- **components/auth.jsx** - login page, handles Login logic
- **components/context.jsx** - the brains of the app, handles most of the global state & the general functions that update these states
- **components/nav.jsx** - the navbar, toggles pages & provides logout
- **components/timetable.jsx** - shows the timetable
- **components/addRecord.jsx** - stand alone-ish component that adds lessons to the calender API, creates the Google events itself rather than using Context.
- **components/alert.jsx** - provides the general alerts, messages and notifications to the user following their actions

