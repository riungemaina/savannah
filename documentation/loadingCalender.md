# Loading Calender

This function provides a loading screen as the calender is setup, the function will use the `useEffect` hook to load initiate the calender loading function in context once this component has mounted. The functions logic looks like this

```JavaScript
  const loadCalender = useApi().loadingCalender;

  useEffect(() => {
    loadCalender();
  }, []);
```
