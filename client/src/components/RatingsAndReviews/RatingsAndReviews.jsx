import React from 'react';
import data from './dummy_data';
import ReviewsList from './ReviewsList';
// import ReviewItem from './ReviewItem';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <ReviewsList />
      </div>

    );
  }
}

export default RatingsAndReviews;
