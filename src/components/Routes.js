import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Views/Home.jsx';
import Login from './Views/Login.jsx';
import Private from './Private/Private';

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
