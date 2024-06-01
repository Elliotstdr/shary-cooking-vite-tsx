import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import "./theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Nouveau contenu disponible. Recharger?")) {
      updateSW(true);
    }
  },
});

addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    console.log('APP resumed');
    updateSW();
  }
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
