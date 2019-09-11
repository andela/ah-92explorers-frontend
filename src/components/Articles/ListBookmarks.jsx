/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchBookmarks, removeBookmark } from '../../redux/actions/actionCreators';
import NavBar from '../Layout/navBar';
import Navbar from '../Layout/Navbar.jsx';

export class ListBookmarkedArticle extends Component {
    state = {
      slug: '',
    }

    componentDidMount() {
      const slug = this.props.match.params.articleSlug;
      this.props.fetchBookmarks(slug);
      this.props.removeBookmark(slug);
    }

    handleOnDelete = () => {
      const { match: { params } } = this.props;
      this.props.removeBookmark(params.articleSlug);
    }

    render() {
      const {
        fetched, owner, authenticated, slug,
      } = this.props.article;
      const { rating = [] } = this.props.article.rating || {};
      return (
        <Fragment>
          { authenticated ? <NavBar /> : <Navbar /> }
          <h2 className="h2-ratings">Bookmarked articles</h2>
          {rating.map(element => (
            <div></div>
          ))}
        </Fragment>
      );
    }
}

const mapStateToProps = (state) => ({
  bookmarks: state.bookmarks,
  article: state.articles || {},
});

export default connect(
  mapStateToProps,
  {
    fetchBookmarks,
    removeBookmark,
  },
)(ListBookmarkedArticle);
