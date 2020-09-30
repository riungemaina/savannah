# Auth.jsx

The component is launched once the app starts, it allows the user to login my authenticating using Google.
This component provide the general functionality for the login page, it includes the layout in JSX its styling & a call to `Context` to a login function. Which happens like so

```JavaScript
const handleLogin = useApi().signIn;
```

The function is called by

```JavaScript
<Button onClick={handleLogin}>
```
