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
import NavBar from '../Layout/navBar';
import Navbar from '../Layout/Navbar.jsx';
import { getArticle, deleteArticle, getRating } from '../../redux/actions/actionCreators';
import { articleRating } from '../../redux/actions/actionCreators/rating';
import Spinner from '../Spinner/Spinner.jsx';
import '../../assets/css/articleread.css';
import manIcon from '../../assets/images/man.jpg';
import Comments from '../Comments/Comments.jsx';
import Messages from '../Messages/Messages.jsx';

export class ArticleReadDelete extends Component {
  state = {
    modal: false,
    modal1: false,
    slug: '',
    value: 0,
    rateAvg: 0,
    tagList: ['Tag'],
  }

  componentDidMount() {
    const slug = this.props.match.params.articleSlug;
    this.props.getArticle(slug);
  }

  componentWillReceiveProps(nextProps) {
    const { rating } = nextProps.article;
    this.setState(prevState => ({
      ...prevState,
      value: rating ? rating.rates : 0,
      rateAvg: nextProps.rateAvg || prevState.rateAvg,
    }));
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

  render() {
    const tags = this.props.article.article.tagList;
    if (tags === undefined) {
      return <Spinner />;
    }
    const { match: { params }, isAuthenticated, commentError } = this.props;
    const userName = localStorage.getItem('username') ? localStorage.getItem('username') : '';
    const profileImg = localStorage.getItem('image') ? localStorage.getItem('image') : manIcon;
    const { value, rateAvg } = this.state;
    const { fetched, owner, authenticated } = this.props.article;
    const { slug } = this.props.article.article;
    const token = localStorage.getItem('jwtToken');
    return (
      <Fragment>
        { isAuthenticated ? <NavBar /> : <Navbar /> }
        <div className="theBodyArticle">
          <div className="colOne">
            { !owner && (
              <div className="rateIcon" onClick={this.toggle1}>
                <img src={Starbtn} className="rateIcon bodyIcons disappear rate" alt="" />
              </div>
            )}
            <br></br>
            { owner && (
            <div className="deleteIcon" onClick={this.toggle}>
              <img src={require('../../assets/icons/trash.svg')} className="bodyIcons deleteIcon" alt="..." />
            </div>
            )}
            <br></br>
            { owner && (
            <div>
              <a href={`/article/${slug}/update`}><img src={require('../../assets/icons/edit.svg')} className="bodyIcons disappear edit tw" alt="..." /></a>
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
                <Link to={`/rating/${slug}`}>
                  {' '}
                  <img src="https://image.flaticon.com/icons/svg/291/291205.svg" className="bodyIcons" alt="" />
                  <small>{rateAvg}</small>
                </Link>
              </div>
            </div>
            <div className="commentsZone">
              { commentError === 'unauthorised to use this resource, please signup/login'
               && (<Messages danger={commentError} error={commentError} />) }
              <div className="commentSection">
                <h4>Comments </h4>
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
            would you like to delete article?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleOnDelete}>Delete Article</Button>
            {' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modal1} toggle={this.toggle1} className={this.props.className}>
          <RatingsModal
            title="Article Ratings"
            rating={value}
            starClick={this.onStarClick}
            handleRatingsSubmit={this.handleRatingsSubmit}
          />
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
});

export const connectReadDelete = connect(mapStateToProps,
  {
    getArticle, articleRating, deleteArticle, getRating,
  })(ArticleReadDelete);
export { connectReadDelete as ReadArticle };
