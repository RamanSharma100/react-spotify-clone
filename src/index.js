import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { applyMiddleware, createStore } from "redux";
import rootReducer from "./redux/reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
