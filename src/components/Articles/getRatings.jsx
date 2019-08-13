/* istanbul ignore file */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import { getRating, getArticle } from '../../redux/actions/actionCreators';
import man from '../../assets/icons/man.svg';
import NavBar from '../Layout/navBar';
import Navbar from '../Layout/Navbar.jsx';

export class ViewArticleRatings extends Component {
    state = {
      slug: '',
      modal: false,
    }

    componentDidMount() {
      const slug = this.props.match.params.articleSlug;
      this.props.getRating(slug);
      this.props.getArticle(slug);
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

      render() {
        const {
          fetched, owner, authenticated, slug,
        } = this.props.article;
        const { rating = [] } = this.props.article.rating;
        return (
          <Fragment>
            { authenticated ? <NavBar /> : <Navbar /> }
            <div className="theBodyArticle">
              <div className="colOne">
                { owner && (
                <div className="deleteIcon" onClick={this.toggle}>
                  <img src={require('../../assets/icons/trash.svg')} className="bodyIcons" alt="..." />
                </div>
                )}
                <br></br>
                { owner && (
                <div>
                  <a href={`/article/${this.state.slug}/update`}><img src={require('../../assets/icons/edit.svg')} className="bodyIcons disappear edit" alt="..." /></a>
                </div>
                )}
              </div>
              <div className="colTwo">
                <h1 className="title">
                  {fetched && this.props.article.article.title}
                </h1>
                { ReactHtmlParser(fetched && this.props.article.article.body) }
                <h2>User Ratings</h2>
                {rating.map(element => (
                  <div className="ratingSection" key={element.id}>
                    <img src={element.reviewer.image ? element.reviewer.image : man} className="commPic" alt="" />
                    <div className="ratings">
                      <span className="ratingName">{element.reviewer.username || ''}</span>
                      <br></br>
                      <div>
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={element.rating}
                          starColor="#ffcc00"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <hr></hr>
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
          </Fragment>
        );
      }
}

const mapStateToProps = (state) => ({
  rating: state.rating,
  article: state.articles,
});

export default connect(
  mapStateToProps,
  {
    getRating,
    getArticle,
  },
)(ViewArticleRatings);
