import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../Layout/Navbar.jsx';
import { getPeopleResults } from '../../redux/actions/actionCreators';

export class People extends Component {
  state = {
    text: '',
  }

  componentDidMount() {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const searchValue = params.get('query');
    this.setState({ text: searchValue });
    this.props.getPeopleResults(searchValue);
  }

  changeText = (e) => {
    this.setState({ text: e.target.value });
  }

  render() {
    const { text } = this.state;
    if (this.props.error) {
      return (
        <div>
          <Navbar token={localStorage.getItem('jwtToken')} username={localStorage.getItem('username')} avatar={localStorage.getItem('image')} />
          <div className="searchBody">
            <div className="filterContainer">
              <ul className="filterList">
                <Link to={`/search?query=${text}`}><li className="filters">Stories</li></Link>
                <li className="filters" style={{ color: 'rgba(0,0,0,.84)', fontWeight: '600' }}>People</li>
                <Link to={`/search/tags?query=${text}`}><li className="filters">Tags</li></Link>
              </ul>
            </div>
            <div className="noResults">No results</div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar token={localStorage.getItem('jwtToken')} username={localStorage.getItem('username')} avatar={localStorage.getItem('image')} />
        <div className="searchBody">
          <div className="filterContainer">
            <ul className="filterList">
              <Link to={`/search?query=${text}`}><li className="filters">Stories</li></Link>
              <li className="filters" style={{ color: 'rgba(0,0,0,.84)', fontWeight: '600' }}>People</li>
              <Link to={`/search/tags?query=${text}`}><li className="filters">Tags</li></Link>
            </ul>
          </div>
          <div>Data Here</div>
        </div>
      </div>
    );
  }
}

const getStateFromStore = state => ({
  results: state.articles.feed,
  error: state.articles.feed.error,
});

export default connect(getStateFromStore, { getPeopleResults })(People);
