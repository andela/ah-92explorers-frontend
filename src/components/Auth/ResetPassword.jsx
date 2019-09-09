import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Validator from '../../utils/resetPswdValidation';
import { submitEmail } from '../../redux/actions/actionCreators/resetPassword';
import '../../assets/scss/resetPassword.scss';
import TopNavbar from '../Layout/TopNavbar.jsx';
import Messages from '../Messages/Messages.jsx';

export class ResetPassword extends Component {
  state = {
    email: '',
    emailError: '',
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      email,
    } = this.state;
    this.clearErrors();

    const emailError = Validator.validateEmail({ email });
    if (emailError) {
      return this.displayError(emailError);
    }

    const submitAnEmail = {
      email,
    };
    this.props.submitEmail(submitAnEmail);
  };

  displayError = (emailError) => {
    this.setState({ emailError });
  };

  clearErrors = () => this.setState(prevState => ({
    ...prevState,
    emailError: '',
  }))

  render() {
    const {
      email, emailError,
    } = this.state;

    const { submittedSuccess, submittedFailure } = this.props;

    if (submittedSuccess) {
      setTimeout(() => this.setState({
        email: '',
      }), 2000);
    }

    if (submittedSuccess) {
      setTimeout(() => this.setState({
        submittedSuccess: true,
      }), 5000);
    }

    return (
      <Fragment>
        <TopNavbar />
        <div className="resetPasswordForm">
          <div className="resetPasswordForm__main">
            {submittedSuccess ? (
              <Messages success={submittedSuccess} />
            ) : submittedFailure ? (
              <Messages error={submittedFailure} />
            ) : false}
            <h3>Reset Password</h3>
            <form className="resetPasswordForm__submit-form form mb-3" onSubmit={this.handleSubmit}>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${emailError ? 'input-error' : ''}`}
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleOnChange}
                />
              </div>
              {emailError && <div className="error">{emailError}</div>}
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Submit Email</button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  submittedSuccess: state.resetPassword.userResetPsw.submittedSuccess,
  submittedFailure: state.resetPassword.userResetPsw.submittedFailure,
});
export default connect(mapStateToProps, { submitEmail })(ResetPassword);
