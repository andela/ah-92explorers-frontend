import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../Layout/Navbar.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import { getSearchResults } from '../../redux/actions/actionCreators';

export class Search extends Component {
  state = {
    text: '',
  }

  componentDidMount() {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const searchValue = params.get('query');
    this.setState({ text: searchValue });
    this.props.getSearchResults(searchValue);
  }

  changeText = (e) => {
    this.setState({ text: e.target.value });
  }

  render() {
    const { results, error } = this.props;
    const { text } = this.state;
    if (results === undefined && !error) {
      return <Spinner />;
    }
    if (error) {
      return (
        <div>
          <Navbar token={localStorage.getItem('jwtToken')} username={localStorage.getItem('username')} avatar={localStorage.getItem('image')} query={text} />
          <div className="searchBody">
            <div className="filterContainer">
              <ul className="filterList">
                <li className="filters" style={{ color: 'rgba(0,0,0,.84)', fontWeight: '600' }}>Stories</li>
                <Link to={`/search/people?query=${text}`}><li className="filters">People</li></Link>
                <Link to={`/search/tags?query=${text}`}><li className="filters">Tags</li></Link>
              </ul>
            </div>
            <h4 className="noResults" style={{ color: 'rgba(0,0,0,.54)' }}>No results</h4>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar token={localStorage.getItem('jwtToken')} username={localStorage.getItem('username')} avatar={localStorage.getItem('image')} query={text} />
        <div className="searchBody">
          <div className="filterContainer">
            <ul className="filterList">
              <li className="filters" style={{ color: 'rgba(0,0,0,.84)', fontWeight: '600' }}>Stories</li>
              <Link to={`/search/people?query=${text}`}><li className="filters">People</li></Link>
              <Link to={`/search/tags?query=${text}`}><li className="filters">Tags</li></Link>
            </ul>
          </div>
          <div className="showResults">
            <span>Stories</span>
            { results.map(result => (
              <div key={result.id} className="singleSearch">
                <div className="articleProf">
                  <img src={result.profile} alt="" className="feedImgSearch" />
                  <div className="searchAD">
                    <Link to={`/user-profile/${result.author}`}><span className="textSearchUser">{result.author}</span></Link>
                    <span className="textSearchDate">{result.date}</span>
                  </div>
                </div>
                <Link to={`/articles/${result.slug}`}><img src={result.image} alt="" className="displaySearchImg" /></Link>
                <Link to={`/articles/${result.slug}`}><h3 style={{ cursor: 'pointer' }}>{result.title}</h3></Link>
                <Link to={`/articles/${result.slug}`}><p style={{ color: 'rgba(0,0,0,.54)', cursor: 'pointer' }}>{result.body}</p></Link>
                <Link to={`/articles/${result.slug}`}><span style={{ color: 'rgba(0,0,0,.54)', cursor: 'pointer' }}>Read more...</span></Link>
              </div>
            )) }
          </div>
        </div>
      </div>
    );
  }
}

const getStateFromStore = state => ({
  results: state.articles.feed,
  error: state.articles.feed.error,
});

export default connect(getStateFromStore, { getSearchResults })(Search);
