import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateArticle from './Articles/CreateArticle.jsx';
import UpdateArticle from './Articles/UpdateArticle.jsx';
import ArticleItem from './Articles/ArticleItem.jsx';
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
        <Route exact path="/article/:articleSlug" component={ArticleItem} />
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/continue" component={Continue} />
        <Route exact path="/login" component={Login} />
      </Fragment>
    </Switch>
  </Router>
);

export default Routes;
