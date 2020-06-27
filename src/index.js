import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import coreReducer from "./reducer";

/**
 * @description - Store being created with along with their reducers.
 */
const store = createStore(coreReducer);

/**
 * @description - Render the app and subscribing to the store.
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
