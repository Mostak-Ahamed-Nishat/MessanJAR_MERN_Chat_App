import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./sass/main.scss";
import store from "./redux/store.js";
import { Provider } from "react-redux";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: "10px",
  // you can also just use 'scale'
  transition: transitions.FADE,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
      <App />
    </Provider>
  </AlertProvider>
);
