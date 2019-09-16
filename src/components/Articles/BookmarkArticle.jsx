/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import bookmarkIcon from '../../assets/icons/bookmark.svg';
import bookmarkGreen from '../../assets/icons/bookmarkBlack.svg';
import { bookmarkArticle, getAllBookmarks } from '../../redux/actions/actionCreators/bookMark';

export class BookmarkArticle extends Component {
  state = { bookmarkIcon, bookmarkGreen };

  componentDidMount() {
    this.props.getAllBookmarks();
    getAllBookmarks();
  }

   handleClick = () => {
     const {
       bookmarkArticle,
     } = this.props;
     const { slug } = this.props.article.article;
     bookmarkArticle(slug);
   };

   render() {
     const { bookmarks, article: { article } } = this.props;
     const {
       bookmarkIcon, bookmarkGreen,
     } = this.state;
     return (
       <div className="row inline-block medium-padding">
         <span className="" />
         <div onClick={this.handleClick}>
           <img src={bookmarks.includes(article.id) ? bookmarkGreen : bookmarkIcon} className="bodyIcons shareIcons bm" alt="" />
         </div>
         <span />
       </div>
     );
   }
}

const mapStateToProps = (state) => ({
  article: state.articles,
  bookmarks: state.boookMarking.bookmarks,
});

export default connect(
  mapStateToProps,
  { bookmarkArticle, getAllBookmarks },
)(BookmarkArticle);
