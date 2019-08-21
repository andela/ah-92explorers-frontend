/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/extensions */
/* eslint-disable import/no-named-as-default */

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateArticle from './Articles/CreateArticle.jsx';
import UpdateArticle from './Articles/UpdateArticle.jsx';
import Signup from './Auth/Signup.jsx';
import { Continue } from './Continue/Continue.jsx';
import Home from './Home.jsx';
import Login from './Containers/Login.jsx';

const Routes = () => (
  <Router>
    <Switch>
          <Fragment>
            <Route exact path="/article" component={CreateArticle} />
            <Route path="/article/:articleSlug/update" component={UpdateArticle} />
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/continue" component={Continue} />
            <Route exact path="/login" component={Login} />
          </Fragment>
        </Switch>
  </Router>
);

export default Routes;
