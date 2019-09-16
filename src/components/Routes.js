/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateArticle from './Articles/CreateArticle.jsx';
import UpdateArticle from './Articles/UpdateArticle.jsx';
import { ReadArticle } from './Articles/ArticleItem.jsx';
import Signup from './Auth/Signup.jsx';
import Feed from './Articles/Feed.jsx';
import Login from './Containers/Login.jsx';
import ViewProfile from './Profile/ViewProfile';
import EditProfile from './Profile/EditProfile';
import ResetPassword from './Auth/ResetPassword';
import ResetingPassword from './Auth/ResettingPassword';
import ViewArticleRatings from './Articles/getRatings';
import Follow from './Follow/Follow.jsx';
import { NotFound } from './NotFound/NotFound';

const Routes = () => (
  <Router>
    <Switch>
      <Fragment>
        <Route exact path="/article" component={CreateArticle} />
        <Route exact path="/article/:articleSlug/update" component={UpdateArticle} />
        <Route exact path="/article/:articleSlug" component={ReadArticle} />
        <Route exact path="/rating/:articleSlug" component={ViewArticleRatings} />
        <Route exact path="/" component={Feed} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={ViewProfile} />
        <Route exact path="/user-profile/:username" component={Follow} />
        <Route exact path="/profile/edit" component={EditProfile} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/resetting-password" component={ResetingPassword} />
        <Route exact path="/not-found" component={NotFound} />
      </Fragment>
    </Switch>
  </Router>
);


export default Routes;
