import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Views/Signup.jsx';
import { Continuee } from './continue/continue';
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
            <Route path="/continue" component={Continuee} />
            <Route exact path="/login" component={Login} />
          </Fragment>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
