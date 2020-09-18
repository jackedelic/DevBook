import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser, login } from "./actions/auth.action";
import Routes from "./components/routing/Routes";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      console.log("got token");
      setAuthToken(localStorage.token);
    }
    // store.dispatch(loadUser(localStorage.token));
    store.dispatch(login({ email: "casey@yahoo.com", password: "111111" }));
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
