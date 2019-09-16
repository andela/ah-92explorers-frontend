/* istanbul ignore file */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import { getRating, getArticle } from '../../redux/actions/actionCreators';
import man from '../../assets/icons/man.svg';
import '../../assets/scss/ratings.scss';

export class ViewArticleRatings extends Component {

    handleOnDelete = () => {
      const { match: { params } } = this.props;
      this.props.deleteArticle(params.articleSlug);
    }

    render() {
      const { rating = [] } = this.props.article.rating || {};
      return (
        <Fragment>
          <ModalHeader toggle={this.props.mytoggle}>
            <h2 className="h2-ratings">User Ratings</h2>
          </ModalHeader>
          <ModalBody>
            {rating.length < 1 ? <span>No Ratings</span> : rating.map(element => (
              <div className="ratingSection" key={element.id}>
                <img src={element.reviewer.image ? element.reviewer.image : man} className="commPic" alt="" />
                <div className="ratings">
                  <Link to={`/user-profile/${element.reviewer.username}`}><span className="ratingName">{element.reviewer.username || ''}</span></Link>
                  <br />
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
          </ModalBody>
        </Fragment>
      );
    }
}

const mapStateToProps = (state) => ({
  rating: state.rating,
  article: state.articles || {},
});

export default connect(
  mapStateToProps,
  {
    getRating,
    getArticle,
  },
)(ViewArticleRatings);
