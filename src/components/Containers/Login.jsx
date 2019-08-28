import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import validateInput from '../../middleware/validations/login';
import { login } from '../../redux/actions/actionCreators';
import LoginComponent from '../Auth/Login.jsx';

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      window.location.href = '/';
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      const { email, password } = this.state;
      this.props.login(email, password);
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const {
      errors, email, password,
    } = this.state;
    const { isLoginSuccess, loginError } = this.props;

    if (isLoginSuccess) {
      return <Redirect to="/" />;
    }

    return (
      <div className="d-flex">
        <div className="form-wrap d-flex">
          <div className="align-self-center">
            <div className="form-wrap-inner align-self-center h-100">
              <a href="/" className="logo">
                <img src={require('../../assets/images/logo.png')} alt="" />
              </a>
              <h3 className="mb-4">Log in With Credentials</h3>
              <p className="mb-5">Foster inspiration and innovation by leveraging the modern web.</p>
              <LoginComponent
                errors={errors}
                email={email}
                password={password}
                loginError={loginError}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
              />
            </div>
          </div>
        </div>
        <div className="img-wrap" style={{ backgroundImage: `url(${'https://cdn.dribbble.com/users/992274/screenshots/6206904/office_kit8-net.png'})` }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoginSuccess: state.login.isLoginSuccess,
  loginError: state.login.loginError,
  auth: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
