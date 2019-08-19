import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
      username: '',
      password: '',
      loggingIn: false,
    };

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loggingIn: true });
    const { username, password } = this.state;
    localStorage.setItem('user', { username, password });
  }

  render() {
    const { username, password, loggingIn } = this.state;
    return (
      <Fragment>
        <div>
          Login
        </div>
        <form name="form" onSubmit={this.handleSubmit}>
          <input type="text" name="username" value={username} onChange={this.handleOnChange} />
          <br />
          <input type="password" name="password" value={password} onChange={this.handleOnChange} />
          <br />
          <button type="submit">
            submit
            {
              loggingIn && <Redirect to="/" />
            }
          </button>
        </form>
      </Fragment>
    );
  }
}

export default Login;
