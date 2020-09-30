# App.js

This Component is responsible for the render, but its otherwise pretty dumb,

```JavaScript
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
```

The app will ensure that if the person is not signed in then the view is set to the login page, otherwise show either the add lesson page or the timetable.
