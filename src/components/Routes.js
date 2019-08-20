import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Views/Signup.jsx';
import Home from './Home.jsx';
import Login from './Containers/Login.jsx';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Fragment>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Fragment>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
