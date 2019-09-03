import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/auth/css/style.css';
import '../../assets/auth/css/bootstrap.min.css';
import '../../assets/auth/css/animate.css';
import Input from '../Common/Input';
import { Social } from './Social';


class LoginComponent extends React.Component {
  render() {
    const {
      loginError, onSubmit, onChange, email, password, errors,
    } = this.props;
    return (
      <div>
        { loginError && <p className="alert alert-danger">{loginError}</p>}
        <form id="loginForm" onSubmit={onSubmit} className="form mb-5">
          <Input
            name="email"
            label="Email"
            value={email}
            error={errors.email}
            onChange={onChange}
            placeholder="Email"
          />
          <Input
            name="password"
            label="Password"
            value={password}
            error={errors.password}
            onChange={onChange}
            type="password"
            placeholder="Password"
          />
          <div className="form-group mb-4">
            <span className="small">
              Don’t have an account?
              {' '}
              <Link to="/signup">Join</Link>
            </span>
            <br />
            <span className="small">
              Forgot password?
              {' '}
              <Link to="/reset-password"> Click here</Link>
            </span>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary btn-block" value="Log in with Email" />
          </div>
          <Social />
        </form>
      </div>
    );
  }
}

export default LoginComponent;
