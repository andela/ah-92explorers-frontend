import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateArticle from './Articles/CreateArticle.jsx';
import UpdateArticle from './Articles/UpdateArticle.jsx';
import ArticleItem from './Articles/ArticleItem.jsx';
import Signup from './Auth/Signup.jsx';
import ResetPassword from './Auth/ResetPassword.jsx';
import ResettingPassword from './Auth/ResettingPassword.jsx';
import { Continue } from './Continue/Continue.jsx';
import Feed from './Articles/Feed.jsx';
import Login from './Containers/Login.jsx';
import ViewProfile from './Profile/ViewProfile';
import EditProfile from './Profile/EditProfile';

const Routes = () => (
  <Router>
    <Switch>
      <Fragment>
        <Route exact path="/article" component={CreateArticle} />
        <Route exact path="/article/:articleSlug" component={ArticleItem} />
        <Route path="/article/:articleSlug/update" component={UpdateArticle} />
        <Route exact path="/" component={Feed} />
        <Route path="/signup" component={Signup} />
        <Route path="/continue" component={Continue} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={ViewProfile} />
        <Route exact path="/profile/edit" component={EditProfile} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/resetting-password" component={ResettingPassword} />
      </Fragment>
    </Switch>
  </Router>
);


export default Routes;
