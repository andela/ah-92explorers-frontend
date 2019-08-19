import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { login, home, Private } from './components';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Private exact path="/" component={home} />
            <Route path="/login" component={login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
