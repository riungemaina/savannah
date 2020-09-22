import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ApiProvider } from "./components/context.jsx";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
