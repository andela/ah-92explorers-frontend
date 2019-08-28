import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import dotenv from 'dotenv';
import { social } from '../../redux/actions/actionCreators';

dotenv.config();

const { APP_URL_BACKEND } = process.env;
class Social extends Component {
  handleOnClick = (e) => {
    const { social: redirectURL } = this.props;
    redirectURL(`${APP_URL_BACKEND}/api/auth/${e.target.id}/`);
  };

  render() {
    return (
      <Fragment>
        <div className="form-group">
          <span className="d-block text-center my-4">or</span>
          <Button className="btn btn-primary btn-facebook btn-block btn-icon" id="facebook" onClick={this.handleOnClick}>
            <span className="btn-icon-inner"><span className="fa fa-facebook" /></span>
            Login with Facebook
          </Button>
          <Button className="btn btn-primary btn-twitter btn-block btn-icon" id="twitter" onClick={this.handleOnClick}>
            <span className="btn-icon-inner"><span className="fa fa-twitter" /></span>
            Login with Twitter
          </Button>
          <Button className="btn btn-primary btn-google btn-block btn-icon" id="google" onClick={this.handleOnClick}>
            <span className="btn-icon-inner"><span className="fa fa-google" /></span>
            Login with Google
          </Button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  socialState: state.social,
});

const socialConnected = connect(mapStateToProps, { social })(Social);
export { socialConnected as Social };
