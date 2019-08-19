import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHome } from '../redux/actions/actionCreators';

class Home extends Component {
  componentDidMount() {
    this.props.getHome();
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <h1>{ name }</h1>
      </div>
    );
  }
}

const stateNow = state => ({
  name: state.home.home,
});

export default connect(stateNow, { getHome })(Home);
