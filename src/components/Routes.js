import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Views/Signup.jsx';
import { Continuee } from './continue/continue';
import Home from './Home.jsx';
import Login from './Containers/Login.jsx';
import CreateArticle from './Articles/CreateArticle.jsx';
import UpdateArticle from './Articles/UpdateArticle.jsx';

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
            <Route exact path="/article" component={CreateArticle} />
            <Route path="/article/:articleSlug/update" component={UpdateArticle} />
          </Fragment>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
