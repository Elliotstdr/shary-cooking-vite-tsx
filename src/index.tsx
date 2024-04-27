import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import "./theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
