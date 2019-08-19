import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './login/login';
import Private from './private/private';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Fragment>
            <Route path="/login" component={Login} />
            <Private exact path="/" component={Home} />
          </Fragment>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
