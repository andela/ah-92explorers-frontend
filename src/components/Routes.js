import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Views/Signup.jsx';
import Login from './Views/Login.jsx';


class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Fragment>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Fragment>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
