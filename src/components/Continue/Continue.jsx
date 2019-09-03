import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { getInfo } from '../../redux/actions/actionCreators';

export class Continue extends Component {
  handleOnClick = () => {
    const searchURL = window.location.search;
    this.props.getInfo(searchURL);
  }

  render() {
    const { success } = this.props.user;
    return (
      <Fragment>
        <div className="row continue">
          <div className="col-sm-12">
            <div className="text-center">
              <Button className="btn__continue" onClick={this.handleOnClick}>Continue to Authors Haven </Button>
              {
                success && <Redirect to="/" />
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.social,
});

const socialConnected = connect(mapStateToProps, { getInfo })(Continue);
export { socialConnected as Continuee };
