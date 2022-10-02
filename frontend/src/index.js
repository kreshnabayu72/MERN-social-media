import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./css/index.css";
import "./css/Home.css";
import "./css/LoginRegister.css";
import "./css/Nav.css";
import "./css/Profile.css";
import "./css/SearchResult.css";
import "./css/Admin.css";
import { Provider } from "react-redux";
import store from "./store";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persistor } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
