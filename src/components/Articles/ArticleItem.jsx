/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-restricted-globals */
/*  istanbul ignore file */
/* eslint-disable react/no-find-dom-node */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuidv4';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import '../../assets/scss/ratings.scss';
import Starbtn from '../../assets/icons/star.svg';
import RatingsModal from './Rating/RatingsModal';
import ViewArticleRatings from './getRatings';
import NavBar from '../Layout/navBar';
import Navbar from '../Layout/Navbar.jsx';
import {
  getArticle, reading, deleteArticle, getRating, likeArticle, dislikeArticle,
} from '../../redux/actions/actionCreators';
import { articleRating } from '../../redux/actions/actionCreators/rating';
import Spinner from '../Spinner/Spinner.jsx';
import BookmarkArticle from './BookmarkArticle';
import '../../assets/css/articleread.css';
import manIcon from '../../assets/images/man.jpg';
import Comments from '../Comments/Comments.jsx';
import Messages from '../Messages/Messages.jsx';
import ShareArticle from './ShareArticle.jsx';
import { reportArticle } from '../../redux/actions/actionCreators/reportArticle';
import '../../assets/css/reportArticle.css';

export class ArticleReadDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      title: '',
      message: '',
      type: '',
      likes: '',
      dislikes: '7',
      likeMessage: '',
      slug: '',
      value: 0,
      rateAvg: 0,
      liked: false,
      disliked: false,
      tagList: ['Tag'],
    };
    this.likeRef = React.createRef();
    this.dislikeRef = React.createRef();
  }

  componentDidMount() {
    const slug = this.props.match.params.articleSlug;
    this.props.getArticle(slug).then(() => {
      this.props.getRating(slug);
    });
    if (this.props.login === true) {
      this.props.reading(slug);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { rating } = nextProps.article;
    this.setState(prevState => ({
      ...prevState,
      value: rating ? rating.rates : 0,
      rateAvg: nextProps.rateAvg || prevState.rateAvg,
    }));
  }

  componentDidUpdate() {
    if (this.state.likes === '') {
      const { likes } = this.props.article.article;
      let counterLikes = 0;
      let counterDislikes = 0;
      likes.forEach((like) => {
        if (like.typeState === 1) {
          counterLikes += 1;
        }
        if (like.typeState === 0) {
          counterDislikes += 1;
        }
        if (like.liker.username === localStorage.getItem('username') && like.typeState === 1) {
          this.likeRef.current.src = 'https://image.flaticon.com/icons/svg/179/179539.svg';
          this.setState({ liked: true, disliked: false });
        }
        if (like.liker.username === localStorage.getItem('username') && like.typeState === 0) {
          this.dislikeRef.current.src = 'https://image.flaticon.com/icons/svg/2107/2107623.svg';
          this.setState({ disliked: true });
        }
      });
      this.setState({ likes: counterLikes, dislikes: counterDislikes });
    }

    return false;
  }

  onStarClick = (nextValue) => {
    this.setState({ value: nextValue });
  }

  handleRatingsSubmit = () => {
    const { match } = this.props;
    const { articleSlug } = match.params;
    const { value } = this.state;
    const { articleRating } = this.props;
    articleRating(articleSlug, value);
    this.setState(prevState => ({
      modal1: !prevState.modal1,
    }));
  }

  handleOnDelete = () => {
    const { match: { params } } = this.props;
    this.props.deleteArticle(params.articleSlug);
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  toggle1 = () => {
    this.setState(prevState => ({
      modal1: !prevState.modal1,
    }));
  }

  toggle2 = () => {
    this.setState(prevState => ({
      modal2: !prevState.modal2,
    }));
  }

  toggle3 = () => {
    this.setState(prevState => ({
      modal3: !prevState.modal3,
    }));
  }

  toggle4 = () => {
    this.setState(prevState => ({
      modal4: !prevState.modal4,
    }));
    const { slug } = this.props.article.article;
    this.props.getRating(slug);
  }

  toggle5 = () => {
    this.setState(prevState => ({
      modal5: !prevState.modal5,
    }));
  }

  handleClickReport = e => {
    e.preventDefault();
    const {
      reportArticle,
    } = this.props;
    const { title, message, type } = this.state;
    const { slug } = this.props.article.article;
    const bodyReport = {
      title,
      message,
      type,
    };
    reportArticle(bodyReport, slug);
    this.toggle5();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  likeArticle = () => {
    if (this.props.isAuthenticated === false) {
      localStorage.clear();
      window.location = '/login';
    }
    const slug = this.props.match.params.articleSlug;
    const {
      liked, likes, disliked, dislikes,
    } = this.state;
    if (liked === true && disliked === false && this.likeRef.current) {
      this.setState({ likes: parseInt(likes, 10) - 1, liked: false });
      this.likeRef.current.src = 'https://image.flaticon.com/icons/svg/66/66744.svg';
      this.props.article.article.likes = this.props.article.article.likes.filter(like => like.liker.username !== localStorage.getItem('username'));
      this.props.likeArticle(slug);
    }

    if (liked === false && disliked === false && this.likeRef.current) {
      this.setState({ likes: parseInt(likes, 10) + 1, liked: true });
      this.likeRef.current.src = 'https://image.flaticon.com/icons/svg/179/179539.svg';
      this.props.article.article.likes.push({ typeState: 1, liker: { username: localStorage.getItem('username'), image: localStorage.getItem('image') } });
      this.props.likeArticle(slug);
    }
    if (liked === false && disliked === true && this.likeRef.current) {
      this.setState({
        dislikes: parseInt(dislikes, 10) - 1,
        liked: true,
        likes: parseInt(likes, 10) + 1,
        disliked: false,
      });
      this.likeRef.current.src = 'https://image.flaticon.com/icons/svg/179/179539.svg';
      this.dislikeRef.current.src = 'https://image.flaticon.com/icons/svg/2107/2107811.svg';
      this.props.article.article.likes = this.props.article.article.likes.filter(like => like.liker.username !== localStorage.getItem('username'));
      this.props.article.article.likes.push({ typeState: 1, liker: { username: localStorage.getItem('username'), image: localStorage.getItem('image') } });
      this.props.likeArticle(slug);
    }
  }

  dislikeArticle = () => {
    if (this.props.isAuthenticated === false) {
      localStorage.clear();
      window.location = '/login';
    }
    const slug = this.props.match.params.articleSlug;
    const {
      liked, likes, disliked, dislikes,
    } = this.state;
    if (disliked === true && liked === false && this.dislikeRef.current) {
      this.setState({ dislikes: parseInt(dislikes, 10) - 1, disliked: false });
      this.dislikeRef.current.src = 'https://image.flaticon.com/icons/svg/2107/2107811.svg';
      this.props.article.article.likes = this.props.article.article.likes.filter(like => like.liker.username !== localStorage.getItem('username'));
      this.props.dislikeArticle(slug);
    }
    if (disliked === false && liked === false && this.dislikeRef.current) {
      this.setState({ dislikes: parseInt(dislikes, 10) + 1, disliked: true });
      this.dislikeRef.current.src = 'https://image.flaticon.com/icons/svg/2107/2107623.svg';
      this.props.article.article.likes.push({ typeState: 0, liker: { username: localStorage.getItem('username'), image: localStorage.getItem('image') } });
      this.props.dislikeArticle(slug);
    }
    if (disliked === false && liked === true && this.dislikeRef.current) {
      this.setState({
        dislikes: parseInt(dislikes, 10) + 1,
        liked: false,
        disliked: true,
        likes: parseInt(likes, 10) - 1,
      });
      this.likeRef.current.src = 'https://image.flaticon.com/icons/svg/66/66744.svg';
      this.dislikeRef.current.src = 'https://image.flaticon.com/icons/svg/2107/2107623.svg';
      this.props.article.article.likes = this.props.article.article.likes.filter(like => like.liker.username !== localStorage.getItem('username'));
      this.props.article.article.likes.push({ typeState: 0, liker: { username: localStorage.getItem('username'), image: localStorage.getItem('image') } });
      this.props.dislikeArticle(slug);
    }
  }

  render() {
    const tags = this.props.article.article.tagList;
    if (tags === undefined) {
      return <Spinner />;
    }
    const { match: { params }, isAuthenticated, commentError } = this.props;
    const userName = localStorage.getItem('username') ? localStorage.getItem('username') : '';
    const profileImg = localStorage.getItem('image') ? localStorage.getItem('image') : manIcon;
    const { value, rateAvg } = this.state;
    const { fetched, owner } = this.props.article;
    const { slug } = this.props.article.article;
    const { title, message, type } = this.state;
    const { likes } = this.props.article.article;
    const newDislikes = [];
    const newLikes = [];
    likes.forEach((like) => {
      if (like.typeState === 0) {
        newDislikes.push(like);
      }
      if (like.typeState === 1) {
        newLikes.push(like);
      }
    });
    return (
      <Fragment>
        { isAuthenticated ? <NavBar /> : <Navbar /> }
        <div className="theBodyArticle AI">
          <div className="colOne">
            <div>
              <div onClick={this.likeArticle} className="stayTop">
                <img src={require('../../assets/icons/like.svg')} ref={this.likeRef} alt="" className="bodyIcons likeIcon" />
              </div>
              <small className="numberLikes stayTopNo" onClick={this.toggle2}>{this.state.likes}</small>
            </div>
            <div>
              <div onClick={this.dislikeArticle} className="stayTop2">
                <img src="https://image.flaticon.com/icons/svg/2107/2107811.svg" ref={this.dislikeRef} alt="" className="bodyIcons dislike" />
              </div>
              <small className="numberLikes stayTopNo2" onClick={this.toggle3}>{this.state.dislikes}</small>
            </div>
            { !owner && (
              <div className="rateIcon stayTop3">
                <img src={Starbtn} className="rateIcon bodyIcons disappear rate" alt="" onClick={this.toggle1} />
                  {' '}
                <small onClick={this.toggle4}>{rateAvg}</small>
              </div>
            )}
            <br />
            { owner && (
            <div className="deleteIcon stayTop4" onClick={this.toggle}>
              <img src={require('../../assets/icons/trash.svg')} className="bodyIcons deleteIcon" alt="..." />
            </div>
            )}
            <br />
            { owner && (
            <div className="stayTop5">
              <a href={`/article/${slug}/update`}><img src={require('../../assets/icons/edit.svg')} className="bodyIcons disappear edit tw" alt="..." /></a>
            </div>
            )}
            { !owner && (
            <div className="bookmarkIcon stayTop6">
              <BookmarkArticle />
            </div>
            )}
            { !owner && (
            <div className="stayTop7">
              <i className="fa fa-flag flag" aria-hidden="true" onClick={this.toggle5}></i>
            </div>
            )}
          </div>
          <div className="colTwo">
            <div>
              <h1 className="titleFeedAI">
                {fetched && this.props.article.article.title}
              </h1>
              <span className="time">
                {fetched && this.props.article.article.time.readTime}
                {' '}
              read
              </span>
              <br />
              { ReactHtmlParser(fetched && this.props.article.article.body) }
              <div className="tagsArticleFeed">
                {tags === null || tags[0] === 'Tag' ? '' : tags[0].split(' ').map((tag) => (
                  <div key={uuid()} style={tags[0] === '' ? { display: 'none' } : { display: 'block' }} className="tagsFeed">
                    <button type="button" className="tags">
                      { tag }
                    </button>
                  </div>
                )) }
              </div>
              <div className="restOfIcons">
                <div className="sharingIcons">
                  <ShareArticle fetched={fetched} article={this.props.article.article} />
                </div>
              </div>
            </div>
            <div className="commentsZone">
              { commentError === 'unauthorised to use this resource, please signup/login'
               && (<Messages danger={commentError} error={commentError} />) }
              <div className="commentSection">
                <Comments
                  username={userName}
                  userImage={profileImg}
                  slug={params.articleSlug}
                />
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Delete Article
            {' '}
            {fetched && this.props.article.article.title}
          </ModalHeader>
          <ModalBody>
            Would you like to delete article?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleOnDelete}>Delete Article</Button>
            {' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modal4} toggle={this.toggle4} className={this.props.className}>
          <ViewArticleRatings mytoggle={this.toggle4} />
        </Modal>

        <Modal isOpen={this.state.modal1} toggle={this.toggle1} className={this.props.className}>
          <RatingsModal
            title="Article Ratings"
            rating={value}
            starClick={this.onStarClick}
            handleRatingsSubmit={this.handleRatingsSubmit}
          />
        </Modal>
        <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
          <ModalHeader>
            <div>
              <span>People that liked!</span>
              <Button close onClick={this.toggle2} style={{ marginLeft: '260px', outline: 'none' }} />
            </div>
          </ModalHeader>
          <ModalBody>
            {newLikes.length < 1
              ? (<span> Be the first to like</span>
              ) : newLikes.map(like => (like.typeState === 1 ? (
                <div key={like.liker.username} style={{ marginBottom: '15px' }}>
                  <Link to={`/user-profile/${like.liker.username}`}><img className="modalLikerImg" src={!like.liker.image ? localStorage.getItem('image') : like.liker.image} alt="" /></Link>
                  <Link to={`/user-profile/${like.liker.username}`}><span>{like.liker.username}</span></Link>
                </div>
              ) : <span>Be the first to like!</span>))}
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.modal3} toggle={this.toggle3}>
          <ModalHeader>
            <div>
              <span>People that disliked!</span>
              <Button close onClick={this.toggle3} style={{ marginLeft: '250px', outline: 'none' }} />
            </div>
          </ModalHeader>
          <ModalBody>
            {newDislikes.length < 1
              ? (<span> Be the first to dislike</span>
              ) : newDislikes.map(like => (like.typeState === 0 ? (
                <div key={like.liker.username} style={{ marginBottom: '15px' }}>
                  <Link to={`/user-profile/${like.liker.username}`}><img className="modalLikerImg" src={!like.liker.image ? localStorage.getItem('image') : like.liker.image} alt="" /></Link>
                  <Link to={`/user-profile/${like.liker.username}`}><span>{like.liker.username}</span></Link>
                </div>
              ) : <span>Be the first to dislike!</span>))}
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modal5} toggle={this.toggle5} className={this.props.className}>
          <ModalHeader>
            <h1>Report article</h1>
          </ModalHeader>
          <ModalBody>
            <div>
              <input type="radio" name="type" value="Spam" onChange={this.onChange} />
              {' '}
                    Spam
              <br />
              <input type="radio" name="type" value="Plagiarism" onChange={this.onChange} />
              {' '}
             Plagiarism
              <br />
              <input type="radio" name="type" value="Harassment" onChange={this.onChange} />
              {' '}
                    Harassment
              <br />
              <input type="radio" name="type" value="Rules violation" onChange={this.onChange} />
              {' '}
                    Rules violation
              <br />
              <br />
              <div>
                <textarea placeholder="Provide additional information" onChange={this.onChange} name="message" className="cmBox2" required />
              </div>
              <button className="report" type="submit" onClick={this.handleClickReport}>Report</button>
            </div>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  article: state.articles,
  isAuthenticated: state.login.isAuthenticated,
  commentError: state.comments.commentError,
  rating: state.articles.rating,
  rateAvg: state.articles.article.rateAvg,
  likes: state.likes.like,
  reports: state.reportingArticle,
  login: state.login.isAuthenticated,
});


export const connectReadDelete = connect(mapStateToProps,
  {
    getArticle,
    reading,
    articleRating,
    deleteArticle,
    getRating,
    likeArticle,
    dislikeArticle,
    reportArticle,
  })(ArticleReadDelete);
export { connectReadDelete as ReadArticle };
