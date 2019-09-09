import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Validator from '../../utils/resetPswdValidation';
import { resettingPassword } from '../../redux/actions/actionCreators/resettingPassword';
import '../../assets/scss/resetPassword.scss';
import TopNavbar from '../Layout/TopNavbar.jsx';
import Messages from '../Messages/Messages.jsx';

export class ResettingPassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    passwordError: '',
    confirmPasswordError: '',
    redirecting: false,
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      password,
    } = this.state;
    this.clearErrors();

    const passwordError = Validator.validatePassoword({ password });
    if (passwordError) {
      return this.displayError(passwordError, 'passwordError');
    }

    const password1 = document.getElementById('password').value;
    const confirmPassword1 = document.getElementById('confirmPassword').value;

    const confirmPasswordError = (password1 !== confirmPassword1);

    if (confirmPasswordError) {
      return this.displayError(confirmPasswordError, 'confirmPasswordError');
    }

    const token = window.location.search.substring(1);
    const submitresetPswd = {
      password, token,
    };
    this.props.resettingPassword(submitresetPswd);
  };

  displayError = (error, key) => {
    this.setState({ [key]: error });
  };

  clearErrors = () => this.setState(prevState => ({
    ...prevState,
    passwordError: '',
    confirmPasswordError: '',
  }))

  render() {
    const {
      passwordError, password, confirmPasswordError, confirmPassword,
    } = this.state;

    const { resetSuccess, resetFailure } = this.props;

    if (resetSuccess) {
      setTimeout(() => this.setState({
        redirecting: true,
      }), 2000);
    }

    if (this.state.redirecting) {
      return <Redirect to="/login" />;
    }

    return (
      <Fragment>
        <TopNavbar />
        <div className="resetPasswordForm">
          <div className="resetPasswordForm__main">
            {resetSuccess ? (
              <Messages success={resetSuccess} />
            ) : resetFailure ? (
              <Messages error={resetFailure} />
            ) : false}
            <h3>Resetting Password</h3>
            <form className="resetPasswordForm__submit-form form mb-3" onSubmit={this.handleSubmit}>
              <br />
              <div className="form-group">
                <input
                  type="password"
                  className={`form-control ${passwordError ? 'input-error' : ''}`}
                  placeholder="new password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.handleOnChange}
                />
              </div>
              {passwordError && <div className="error">{passwordError}</div>}
              <div className="form-group">
                <input
                  type="password"
                  className={`form-control ${confirmPasswordError ? 'input-error' : ''}`}
                  placeholder="confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleOnChange}
                />
              </div>
              <div>
                {confirmPasswordError ? (
                  <div className="error">
                   Password Not match!
                  </div>
                ) : false}
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  resetSuccess: state.resettingPassword.resettingPsw.resetSuccess,
  resetFailure: state.resettingPassword.resettingPsw.resetFailure,
});

export default connect(mapStateToProps, { resettingPassword })(ResettingPassword);
