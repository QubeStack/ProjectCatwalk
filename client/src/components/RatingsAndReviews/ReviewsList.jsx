import React from 'react';
import data from './dummy_data';
import ReviewItem from './ReviewItem';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        {data.results.map(
          (review) => (
            <ReviewItem
              summary={review.summary}
              username={review.reviewer_name}
              date={review.date}
              body={review.body}
              recommend={review.recommend}
              response={review.response}
            />
          ),
        )}
      </div>
    );
  }
}

export default ReviewList;
