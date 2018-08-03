import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router,Route } from "react-router-dom";
import store from "./stores/configureStore.js";
import App from './containers/App';


ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Route exact path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
