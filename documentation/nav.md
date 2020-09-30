# Nav

The nav allows the user to either switch the view or logout, the components logic looks like this

```JavaScript
  const handleLogout = useApi().logOut;
  const btnText = useApi().pageViewState;
  const toggle = useApi().togglePage;
```

The component makes the requests to context that will handle everything. The `pageViewState` is used to display the **Switch** page text.
