import React from 'react';
import {
  Button, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';

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

export default RatingsModal;
