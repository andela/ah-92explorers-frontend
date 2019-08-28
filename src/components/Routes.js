import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateArticle from './Articles/CreateArticle.jsx';
import UpdateArticle from './Articles/UpdateArticle.jsx';
import ArticleItem from './Articles/ArticleItem.jsx';
import Signup from './Auth/Signup.jsx';
import { Continue } from './Continue/Continue.jsx';
import Home from './Home.jsx';
import Login from './Containers/Login.jsx';
import viewProfile from './Views/viewProfile';
import editProfile from './Views/editProfile';
import ResetPassword from './Auth/ResetPassoword.jsx';
import ResetingPassword from './Auth/ResettingPassoword.jsx';

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
        <Route exact path="/profile" component={viewProfile} />
        <Route exact path="/profile/edit" component={editProfile} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/resetting-password" component={ResetingPassword} />
      </Fragment>
    </Switch>
  </Router>
);


export default Routes;
