/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { getAllBookmarks, removeBookmark } from '../../redux/actions/actionCreators/bookMark';
import NavBar from '../Layout/navBar';
import terre from '../../assets/icons/terrestial.jpg';
import manIcon from '../../assets/icons/man.svg';

export class ListBookmark extends Component {
  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    token ? this.props.getAllBookmarks() : window.location.href = '/login';
  }

    handleOnClick = slug => {
      window.location.href = `/article/${slug}`;
    };

  deleteBookmark = (slug) => {
    this.props.removeBookmark(slug).then((res) => {
      this.props.getAllBookmarks(slug);
    });
  };

  render() {
    const myBookmarks = this.props.Bookmarks && this.props.Bookmarks.Bookmarks;
    const arrayBookmarks = myBookmarks && myBookmarks.Bookmarks;
    const lengthBookmarks = arrayBookmarks && arrayBookmarks.length;
    return (
      <Fragment>
        <NavBar />
        <Container className="articles">
          <h3 style={{ textAlign: 'left', color: 'black' }}>Bookmarks</h3>
          <hr />
          <div className="container-profile-view">
            <div className="row">
              <div className="col-12 main-articles profile-articles-container">
                {lengthBookmarks < 1 ? <span className="not-found-bookmark">No Bookmarks</span> : (
                  myBookmarks && myBookmarks.Bookmarks.map((element, id) => (
                    <div className="bookmark-wrapper" key={element.article.slug}>
                      <div className="bookmark-container">
                        <div className="article-info-bookmark">
                          <h1
                            onClick={() => {
                              this.handleOnClick(element.article.slug);
                            }}
                            role="presentation"
                            className="bookmark-title"
                          >
                            {element.article.title}
                          </h1>
                          <p
                            className="description-bookmark"
                            onClick={() => {
                              this.handleOnClick(element.article.slug);
                            }}
                          >
                            {ReactHtmlParser(ReactHtmlParser(`${element.article.body.substring(0, 30)}....`))}
                          </p>
                          <div>
                            <span className="authorIcon"><img src={element.article.author.image || manIcon} alt="" /></span>
                            {' '}
                            <Link to={`/user-profile/${element.article.author.username}`}><span className="authorBookmark">{element.article.author.username}</span></Link>
                            {' '}
                          </div>
                          <span className="trash-bookmark" onClick={() => this.deleteBookmark(element.article.slug)}>
                            <img src={require('../../assets/icons/trash.svg')} className="bodyIconsBookmark deleteIcon" alt="..." />
                          </span>
                        </div>
                        <div className="bookmarked-article-image">
                          <img src={element.article.image || terre} alt="" />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </Container>
      </Fragment>
    );
  }
}

export const mapStateToProps = (state) => ({
  bookmarks: state.boookMarking.bookmarks,
  Bookmarks: state.boookMarking,
  article: state.articles,
});

export default connect(
  mapStateToProps,
  {
    getAllBookmarks,
    removeBookmark,
  },
)(ListBookmark);
