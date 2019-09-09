import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';

const RatingsModal = (props) => {
  const {
    title, rating, starClick, handleRatingsSubmit,
  } = props;
  return (
    <>
      <ModalHeader>
        {title}
      </ModalHeader>
      <ModalBody>
        <div>
          <div>
          Add your ratings for this article
          </div>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            starColor="#ffcc00"
            onStarClick={starClick}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button primary onClick={handleRatingsSubmit}>Save Ratings</Button>
      </ModalFooter>
    </>
  );
};
RatingsModal.defaultProps = {
  title: '',
  starClick: () => '',
  handleRatingsSubmit: () => '',
  rating: 0,
};
RatingsModal.propTypes = {
  title: PropTypes.string,
  starClick: PropTypes.func,
  handleRatingsSubmit: PropTypes.func,
  rating: PropTypes.number,
};
export default RatingsModal;
