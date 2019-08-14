import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Fragment>
            <Route exact path="/" component={Home} />
          </Fragment>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
